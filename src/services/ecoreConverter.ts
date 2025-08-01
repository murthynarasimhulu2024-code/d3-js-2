import { EcoreModel, EcoreElement } from '../types/chart';

export class EcoreConverter {
  static convertD3ToEcore(d3Code: string, chartName: string): EcoreModel {
    const model: EcoreModel = {
      name: `${chartName}Model`,
      elements: []
    };

    try {
      // Parse D3 code and extract key components
      const elements = this.parseD3Code(d3Code);
      model.elements = elements;
    } catch (error) {
      console.error('Error converting D3 to Ecore:', error);
      // Return a basic error model
      model.elements = [{
        type: 'Error',
        name: 'ConversionError',
        attributes: {
          message: 'Failed to parse D3 code',
          originalCode: d3Code
        }
      }];
    }

    return model;
  }

  private static parseD3Code(code: string): EcoreElement[] {
    const elements: EcoreElement[] = [];

    // Extract dimensions
    const widthMatch = code.match(/(?:const\s+)?width\s*=\s*(\d+)/);
    const heightMatch = code.match(/(?:const\s+)?height\s*=\s*(\d+)/);
    
    if (widthMatch || heightMatch) {
      elements.push({
        type: 'Dimensions',
        name: 'ChartDimensions',
        attributes: {
          width: widthMatch ? parseInt(widthMatch[1]) : 800,
          height: heightMatch ? parseInt(heightMatch[1]) : 600
        }
      });
    }

    // Extract scales
    const scaleMatches = code.matchAll(/(?:const\s+)?(\w+)\s*=\s*d3\.scale(\w+)\(\)/g);
    for (const match of scaleMatches) {
      elements.push({
        type: 'Scale',
        name: match[1],
        attributes: {
          scaleType: match[2],
          variable: match[1]
        }
      });
    }

    // Extract SVG creation
    const svgMatch = code.match(/d3\.create\("svg"\)/);
    if (svgMatch) {
      elements.push({
        type: 'SVGContainer',
        name: 'MainSVG',
        attributes: {
          element: 'svg',
          method: 'create'
        }
      });
    }

    // Extract data binding patterns
    const dataMatches = code.matchAll(/\.data\(([^)]+)\)/g);
    for (const match of dataMatches) {
      elements.push({
        type: 'DataBinding',
        name: 'DataJoin',
        attributes: {
          dataSource: match[1].trim()
        }
      });
    }

    // Extract geometric elements
    const geometryPatterns = [
      { pattern: /\.append\("rect"\)/, type: 'Rectangle' },
      { pattern: /\.append\("circle"\)/, type: 'Circle' },
      { pattern: /\.append\("line"\)/, type: 'Line' },
      { pattern: /\.append\("path"\)/, type: 'Path' },
      { pattern: /\.append\("text"\)/, type: 'Text' },
      { pattern: /\.append\("g"\)/, type: 'Group' }
    ];

    geometryPatterns.forEach(({ pattern, type }) => {
      const matches = code.match(pattern);
      if (matches) {
        elements.push({
          type: 'GeometricElement',
          name: type,
          attributes: {
            elementType: type.toLowerCase(),
            svgElement: type.toLowerCase()
          }
        });
      }
    });

    // Extract axes
    const axisMatches = code.matchAll(/d3\.axis(Left|Right|Top|Bottom)\(/g);
    for (const match of axisMatches) {
      elements.push({
        type: 'Axis',
        name: `${match[1]}Axis`,
        attributes: {
          orientation: match[1].toLowerCase(),
          axisType: match[1]
        }
      });
    }

    // If no elements found, create a basic structure
    if (elements.length === 0) {
      elements.push({
        type: 'Chart',
        name: 'BasicChart',
        attributes: {
          description: 'Basic D3 chart structure',
          codeLength: code.length
        }
      });
    }

    return elements;
  }

  static ecoreToJson(model: EcoreModel): string {
    return JSON.stringify(model, null, 2);
  }

  static ecoreToXml(model: EcoreModel): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" name="${model.name}">\n`;
    
    model.elements.forEach(element => {
      xml += this.elementToXml(element, 1);
    });
    
    xml += '</ecore:EPackage>';
    return xml;
  }

  private static elementToXml(element: EcoreElement, indent: number): string {
    const spaces = '  '.repeat(indent);
    let xml = `${spaces}<eClassifiers xsi:type="ecore:EClass" name="${element.name}" instanceTypeName="${element.type}">\n`;
    
    // Add attributes
    Object.entries(element.attributes).forEach(([key, value]) => {
      xml += `${spaces}  <eStructuralFeatures xsi:type="ecore:EAttribute" name="${key}" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString" defaultValue="${value}"/>\n`;
    });
    
    // Add children if any
    if (element.children) {
      element.children.forEach(child => {
        xml += this.elementToXml(child, indent + 1);
      });
    }
    
    xml += `${spaces}</eClassifiers>\n`;
    return xml;
  }
}