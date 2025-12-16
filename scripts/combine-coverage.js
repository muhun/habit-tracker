#!/usr/bin/env node

import fs from 'fs';

const combineReports = () => {
  const unitCoverage = './coverage/coverage-summary.json';
  const e2eCoverage = './coverage-e2e/coverage-summary.json';
  
  console.log('📊 Coverage Summary:');
  console.log('==================');
  
  if (fs.existsSync(unitCoverage)) {
    const unit = JSON.parse(fs.readFileSync(unitCoverage, 'utf8'));
    console.log('🧪 Unit/Integration Tests:');
    console.log(`   Lines: ${unit.total.lines.pct}%`);
    console.log(`   Functions: ${unit.total.functions.pct}%`);
    console.log(`   Branches: ${unit.total.branches.pct}%`);
    console.log(`   Statements: ${unit.total.statements.pct}%`);
  }
  
  if (fs.existsSync(e2eCoverage)) {
    const e2e = JSON.parse(fs.readFileSync(e2eCoverage, 'utf8'));
    console.log('🎭 E2E Tests:');
    console.log(`   Lines: ${e2e.total.lines.pct}%`);
    console.log(`   Functions: ${e2e.total.functions.pct}%`);
    console.log(`   Branches: ${e2e.total.branches.pct}%`);
    console.log(`   Statements: ${e2e.total.statements.pct}%`);
  }
  
  console.log('');
  console.log('📁 Coverage Reports:');
  console.log('   Unit/Integration: ./coverage/index.html');
  console.log('   E2E: ./coverage-e2e/index.html');
};

combineReports();