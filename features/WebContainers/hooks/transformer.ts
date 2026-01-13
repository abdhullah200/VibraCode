interface TemplateFile {
  filename: string;
  fileExtension: string;
  content: string;
}

interface TemplateFolder {
  folderName: string;
  items: (TemplateFile | TemplateFolder)[];
}

type TemplateItem = TemplateFile | TemplateFolder;

interface WebContainerFile {
  file: {
    contents: string;
  };
}

interface WebContainerDirectory {
  directory: {
    [key: string]: WebContainerFile | WebContainerDirectory;
  };
}

type WebContainerFileSystem = Record<string, WebContainerFile | WebContainerDirectory>;

function isTemplateFolder(item: TemplateItem): item is TemplateFolder {
  return 'folderName' in item && 'items' in item;
}

function isTemplateFile(item: TemplateItem): item is TemplateFile {
  return 'filename' in item && 'fileExtension' in item && 'content' in item;
}

export function transformToWebContainerFormat(template: TemplateFolder): WebContainerFileSystem {
  function processItem(item: TemplateItem): WebContainerFile | WebContainerDirectory {
    if (isTemplateFolder(item)) {
      // This is a directory
      const directoryContents: WebContainerFileSystem = {};
      
      item.items.forEach(subItem => {
        let key: string;
        if (isTemplateFile(subItem)) {
          key = subItem.fileExtension 
            ? `${subItem.filename}.${subItem.fileExtension}`
            : subItem.filename;
        } else {
          key = subItem.folderName;
        }
        directoryContents[key] = processItem(subItem);
      });

      return {
        directory: directoryContents
      };
    } else {
      // This is a file - ensure content is a valid string
      let fileContent = item.content || '';
      
      // Validate that content is actually a string
      if (typeof fileContent !== 'string') {
        console.warn(`Invalid content for ${item.filename}, converting to string`);
        fileContent = String(fileContent);
      }
      
      // Check for potential issues with large files
      if (fileContent.length > 5000000) {
        console.warn(`Very large file: ${item.filename} (${fileContent.length} bytes)`);
      }
      
      return {
        file: {
          contents: fileContent
        }
      };
    }
  }

  const result: WebContainerFileSystem = {};
  
  template.items.forEach(item => {
    let key: string;
    if (isTemplateFile(item)) {
      key = item.fileExtension 
        ? `${item.filename}.${item.fileExtension}`
        : item.filename;
    } else {
      key = item.folderName;
    }
    result[key] = processItem(item);
  });

  return result;
}