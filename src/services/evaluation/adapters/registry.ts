import { 
  EvaluatorAdapter, 
  EvaluatorFamily, 
  EvaluationCriterion 
} from '../../../types/projectEvaluation';
import { WebEvaluator } from './webEvaluator';
import { PythonEvaluator } from './pythonEvaluator';
import { ReactEvaluator } from './reactEvaluator';
import { BackendEvaluator } from './backendEvaluator';
import { FullstackEvaluator } from './fullstackEvaluator';

/**
 * Static, non-dynamic registry of evaluator adapters.
 * All adapter instances are strictly instantiated at startup.
 * ZERO dynamic module loading or filesystem imports based on database values.
 */
class EvaluatorRegistry {
  private readonly adapters: Record<EvaluatorFamily, EvaluatorAdapter>;

  constructor() {
    this.adapters = {
      web: new WebEvaluator(),
      python: new PythonEvaluator(),
      react: new ReactEvaluator(),
      backend: new BackendEvaluator(),
      fullstack: new FullstackEvaluator(),
      general: new WebEvaluator() // fallback
    };
  }

  /**
   * Returns the registered adapter for a given evaluator family.
   */
  public getAdapter(family: EvaluatorFamily): EvaluatorAdapter {
    return this.adapters[family] || this.adapters.web;
  }

  /**
   * Resolves the appropriate adapter for an individual criterion based on its rule type and target file.
   */
  public resolveAdapter(criterion: EvaluationCriterion, defaultFamily?: EvaluatorFamily): EvaluatorAdapter {
    const rule = criterion.privateConfig?.rule || criterion.type;
    const targetFile = criterion.privateConfig?.targetFile;

    // 1. Explicit React rules
    if (
      rule === 'requiredComponent' ||
      rule === 'requiredHook' ||
      rule === 'requiredJSX' ||
      rule === 'requiredEventHandler' ||
      rule === 'requiredStateIdentifier' ||
      rule === 'componentRelationship'
    ) {
      return this.adapters.react;
    }

    // 2. Explicit Backend rules
    if (
      rule === 'requiredRoute' ||
      rule === 'requiredController' ||
      rule === 'requiredHttpMethod' ||
      rule === 'requiredValidation' ||
      rule === 'requiredResponseStructure' ||
      rule === 'requiredAuthMiddleware'
    ) {
      return this.adapters.backend;
    }

    // 3. Explicit Fullstack rules
    if (
      rule === 'frontendApiReference' ||
      rule === 'backendEndpointExists' ||
      rule === 'dataModelExists' ||
      rule === 'authReferenceExists' ||
      rule === 'frontendComponentExists'
    ) {
      return this.adapters.fullstack;
    }

    // 4. Python target or Python rules
    if (
      targetFile === 'py' ||
      rule === 'py_ast' ||
      rule === 'requiredClass' ||
      rule === 'requiredImport' ||
      rule === 'astNode'
    ) {
      return this.adapters.python;
    }

    // 5. Default family if provided and valid
    if (defaultFamily && this.adapters[defaultFamily]) {
      return this.adapters[defaultFamily];
    }

    // 6. Default to Web adapter
    return this.adapters.web;
  }
}

export const evaluatorRegistry = new EvaluatorRegistry();
