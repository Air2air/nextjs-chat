import { join } from 'path';
import { readFileSync } from 'fs';

export function readMarkdown(filePath: string): string {
  const fullPath = join(process.cwd(), filePath);
  return readFileSync(fullPath, 'utf8');
}