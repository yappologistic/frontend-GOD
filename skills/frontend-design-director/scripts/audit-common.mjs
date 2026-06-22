export const severityRank = {
  low: 1,
  medium: 2,
  high: 3
};

export function parseAuditArgs(args, defaultTarget) {
  const options = {
    json: args.includes('--json'),
    help: args.includes('--help') || args.includes('-h'),
    minSeverity: valueAfter(args, '--min-severity') || 'low',
    failOnSeverity: valueAfter(args, '--fail-on') || (args.includes('--fail-on-warning') ? 'low' : null),
    targetArg: args.find((arg, index) => {
      if (arg.startsWith('--')) return false;
      const previous = args[index - 1];
      return previous !== '--min-severity' && previous !== '--fail-on';
    }) || defaultTarget
  };

  assertSeverity(options.minSeverity, '--min-severity');
  if (options.failOnSeverity) assertSeverity(options.failOnSeverity, '--fail-on');

  return options;
}

export function filteredWarnings(warnings, minSeverity) {
  const minimum = severityRank[minSeverity];
  return warnings.filter((warning) => severityRank[warning.severity] >= minimum);
}

export function shouldFail(warnings, failOnSeverity) {
  if (!failOnSeverity) return false;
  const minimum = severityRank[failOnSeverity];
  return warnings.some((warning) => severityRank[warning.severity] >= minimum);
}

export function writeReport({ tool, title, subtitle, scanned, warnings, options, extra = {} }) {
  const visibleWarnings = filteredWarnings(warnings, options.minSeverity);
  if (options.json) {
    console.log(JSON.stringify({
      tool,
      scanned,
      warningCount: visibleWarnings.length,
      minSeverity: options.minSeverity,
      warnings: visibleWarnings,
      ...extra
    }, null, 2));
    return;
  }

  console.log(title);
  console.log(`${subtitle}\n`);
  for (const warning of visibleWarnings) {
    const location = warning.line ? `${warning.file}:${warning.line}` : warning.file;
    console.log(`[${warning.severity}][${warning.rule}] ${location} ${warning.message}`);
  }
  console.log(`\nScanned ${scanned} files. Found ${visibleWarnings.length} warnings.`);
}

export function warning(rule, severity, file, line, message) {
  assertSeverity(severity, `severity for ${rule}`);
  return { rule, severity, file, line, message };
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function assertSeverity(value, flag) {
  if (!Object.hasOwn(severityRank, value)) {
    throw new Error(`${flag} must be one of: high, medium, low`);
  }
}
