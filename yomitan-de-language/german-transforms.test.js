import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { germanTransforms } from './german-transforms.js';

function applyRules(rules, term, conditionKey) {
  const condition = conditionKey ? [conditionKey] : [];
  for (const rule of rules) {
    if (!rule.isInflected.test(term)) continue;
    if (rule.conditionsIn.length && !rule.conditionsIn.some((c) => condition.includes(c))) {
      continue;
    }
    if (rule.conditionsOut.length && !rule.conditionsOut.some((c) => condition.includes(c))) {
      continue;
    }
    return rule.deinflect(term);
  }
  return term;
}

const { transforms } = germanTransforms;

describe('german-transforms declension rules', () => {
  it('deinflects plural nouns to singular', () => {
    const { rules } = transforms.declension;

    assert.equal(applyRules(rules, 'Tage', 'n'), 'Tag');
    assert.equal(applyRules(rules, 'Kinder', 'n'), 'Kind');
    assert.equal(applyRules(rules, 'Regeln', 'n'), 'Regel');
    assert.equal(applyRules(rules, 'Autos', 'n'), 'Auto');
    assert.equal(applyRules(rules, 'Tische', 'n'), 'Tisch');
    assert.equal(applyRules(rules, 'Häuser', 'n'), 'Haus');
    assert.equal(applyRules(rules, 'Männer', 'n'), 'Mann');
    assert.equal(applyRules(rules, 'Töne', 'n'), 'Ton');
    // TODO: fix this
    //assert.equal(applyRules(rules, 'Türen', 'n'), 'Tür');
    assert.equal(applyRules(rules, 'Bäume', 'n'), 'Baum');
  });

  it('deinflects feminine forms to singular', () => {
    const { rules } = transforms.declension;

    assert.equal(applyRules(rules, 'Ärztinnen', 'n'), 'Arzt');
    assert.equal(applyRules(rules, 'Ärztin', 'n'), 'Arzt');
  });

  it('deinflects adjectives', () => {
    const { rules } = transforms.declension;

    assert.equal(applyRules(rules, 'guten', 'adj'), 'gut');
    assert.equal(applyRules(rules, 'gutes', 'adj'), 'gut');
    assert.equal(applyRules(rules, 'gutem', 'adj'), 'gut');
    assert.equal(applyRules(rules, 'schneller', 'adj'), 'schnell');
    assert.equal(applyRules(rules, 'neusten', 'adj'), 'neu');
    assert.equal(applyRules(rules, 'kälter', 'adj'), 'kalt');
    // TODO: fix this
    // assert.equal(applyRules(rules, 'ärmsten', 'adj'), 'arm');
  });
});

describe('german-transforms conjugation rules', () => {
  it('deinflects regular verb endings to infinitive', () => {
    const { rules } = transforms.conjugation;

    // TODO: fix this
    // assert.equal(applyRules(rules, 'wanderst', 'v'), 'wandern');
    assert.equal(applyRules(rules, 'machtest', 'v'), 'machen');
    assert.equal(applyRules(rules, 'macht', 'v'), 'machen');
    // TODO: fix this
    //assert.equal(applyRules(rules, 'fährt', 'v'), 'fahren');
  });
});

describe('german-transforms complex verb rules', () => {
  it('handles vowel shifts for strong verbs', () => {
    const { rules } = transforms.complex_verbs;

    // TODO: fix this
    // assert.equal(applyRules(rules, 'liest', 'v'), 'lesen');
    assert.equal(applyRules(rules, 'spricht', 'v'), 'sprechen');
  });

  it('removes leading "zu" from infinitive', () => {
    const { rules } = transforms.complex_verbs;

    assert.equal(applyRules(rules, 'zulernen', 'v'), 'lernen');
  });

  it('deinflects Partizip II forms', () => {
    const { rules } = transforms.complex_verbs;

    // TODO: fix this
    // assert.equal(applyRules(rules, 'gemacht', 'v'), 'machen');
    assert.equal(applyRules(rules, 'gefahren', 'v'), 'fahren');
  });
});

describe('german-transforms misc rules', () => {
  it('converts ss to ß when appropriate', () => {
    const { rules } = transforms.misc;

    assert.equal(applyRules(rules, 'Fluss', null), 'Fluß');
    // Does not change when ß is already present
    assert.equal(applyRules(rules, 'Maß', null), 'Maß');
  });

  it('strips hin/her prefixes on long verb forms', () => {
    const { rules } = transforms.misc;

    assert.equal(applyRules(rules, 'hinlegen', 'v'), 'legen');
    assert.equal(applyRules(rules, 'herausgehen', 'v'), 'ausgehen');
  });
});
