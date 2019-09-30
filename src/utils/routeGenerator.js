export const generateRoute = (route, parameters) => route.replace(/(?::([A-Za-z]+)\??)+/g, (match, param, offset, string) => (parameters[param] || ''))
