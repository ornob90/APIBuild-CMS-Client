export const extractParams = (path: string) => {
  return path.match(/:(\w+)/g)?.map((param) => param.substring(1)) || [];
};

export const isValidEndpoint = (path: string) => {
  const regex = /^\/[a-zA-Z0-9-]+(?:\/:[a-zA-Z0-9]+|\/[a-zA-Z0-9-]+)*$/;

  // First, check if the path follows the correct format
  if (!regex.test(path)) return false;

  // Extract all parameters (words prefixed with ':')
  const paramMatches = path.match(/:(\w+)/g) || [];

  // Remove ":" from each param and check for duplicates
  const params = paramMatches.map((param) => param.substring(1));
  const uniqueParams = new Set(params);

  return params.length === uniqueParams.size; // Ensures no duplicates
};
