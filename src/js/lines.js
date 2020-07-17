import codeLiner from './codeLiner';

const containers = document.querySelectorAll('[data-lines]');

codeLiner.observeIntersections = true;

const codeLiners = [...containers].map(container => codeLiner(container))