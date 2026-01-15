import {useState, useEffect, useCallback} from 'react';
import { toast } from 'sonner';
import { TemplateFolder } from '../lib/path-to-json';
import { set } from 'date-fns';
import { id, th } from 'date-fns/locale';
import { getPlaygroundById, SaveUpdatedCode } from '../actions/index';

interface GitHubRepoMetadata {
  isGitHubRepo: boolean;
  repoId: string;
  fullName: string;
  cloneUrl: string;
  defaultBranch: string;
}

interface PlaygroundData {
  id: string;
  title?: string;
  [key: string]: any;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(null);
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayground = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getPlaygroundById(id);
    
      setPlaygroundData(data ? { ...data, id } : null);

      const rawContent = data?.templateFiles?.[0]?.content;
      
      // Check if this is a GitHub repository
      const isGitHubRepo = (content: any): content is GitHubRepoMetadata => {
        return (
          content &&
          typeof content === 'object' &&
          !Array.isArray(content) &&
          'isGitHubRepo' in content &&
          content.isGitHubRepo === true &&
          'repoId' in content &&
          'fullName' in content
        );
      };

      if (isGitHubRepo(rawContent)) {
        console.log('Loading GitHub repository:', rawContent);
        
        // Fetch repository contents from GitHub
        const repoResponse = await fetch(
          `/api/github/repo-tree?repoId=${rawContent.repoId}`
        );
        
        if (!repoResponse.ok) {
          throw new Error('Failed to fetch repository contents from GitHub');
        }
        
        const repoData = await repoResponse.json();
        
        if (repoData.templateData) {
          setTemplateData(repoData.templateData);
          toast.success(`Loaded ${rawContent.fullName} from GitHub`);
        } else {
          throw new Error('No template data returned from GitHub');
        }
        return;
      }
      
      if (typeof rawContent === "string") {
        const parsedContent = JSON.parse(rawContent);
        setTemplateData(parsedContent);
        toast.success("Playground loaded successfully");
        return;
      }

      // Load template from API if not in saved content
      const res = await fetch(`/api/template/${id}`);
      if (!res.ok) throw new Error(`Failed to load template: ${res.status}`);

      const templateRes = await res.json();
      if (templateRes.data) {
        setTemplateData(templateRes.data);
      } else {
        setTemplateData({
          folderName: "Root",
          items: [],
        });
      }

      toast.success("Template loaded successfully");
    } catch (error) {
      console.error("Error loading playground:", error);
      setError("Failed to load playground data");
      toast.error("Failed to load playground data");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const saveTemplateData = useCallback(async (data: TemplateFolder) => {
    try {
      await SaveUpdatedCode(id, data);
      setTemplateData(data);
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error("Error saving template data:", error);
      toast.error("Failed to save changes");
      throw error;
    }
  }, [id]);

  useEffect(() => {
    loadPlayground();
  }, [loadPlayground]);

  return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  };
};