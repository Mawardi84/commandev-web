export type EvaluatorFamily = 'web' | 'python' | 'react' | 'backend' | 'fullstack' | 'general';

export type EvaluationRuleType = 
  // HTML Rule Family
  | 'requiredTag'
  | 'requiredAttribute'
  | 'requiredText'
  | 'elementCount'
  | 'semanticStructure'
  // CSS Rule Family
  | 'requiredSelector'
  | 'requiredProperty'
  | 'requiredPropertyValue'
  | 'mediaQuery'
  | 'layoutRule'
  // JavaScript Rule Family
  | 'requiredFunction'
  | 'requiredIdentifier'
  | 'requiredCall'
  | 'requiredEventListener'
  | 'syntaxPattern'
  // Python Rule Family
  | 'requiredClass'
  | 'requiredImport'
  | 'astNode'
  | 'forbiddenConstruct'
  // React Rule Family
  | 'requiredComponent'
  | 'requiredHook'
  | 'requiredJSX'
  | 'requiredEventHandler'
  | 'requiredStateIdentifier'
  | 'componentRelationship'
  // Backend Rule Family
  | 'requiredRoute'
  | 'requiredController'
  | 'requiredHttpMethod'
  | 'requiredValidation'
  | 'requiredResponseStructure'
  | 'requiredAuthMiddleware'
  // Fullstack Rule Family
  | 'frontendApiReference'
  | 'backendEndpointExists'
  | 'dataModelExists'
  | 'authReferenceExists'
  | 'frontendComponentExists'
  // General Rule Family
  | 'requiredFile'
  | 'forbiddenPattern'
  | 'sourceLength'
  | 'fileContains'
  | 'fileDoesNotContain'
  // Backward-compatibility aliases from Phase 5C.1
  | 'html_structure'
  | 'css_style'
  | 'js_syntax'
  | 'py_ast'
  | 'file_presence'
  | 'regex_pattern'
  | 'forbidden_construct'
  | 'custom_declarative';

export type CriterionType = EvaluationRuleType;

export interface EvaluationRuleParameters {
  tag?: string;
  tags?: string[];
  minCount?: number;
  maxCount?: number;
  attribute?: string;
  valuePattern?: string;
  text?: string;
  caseSensitive?: boolean;
  selector?: string;
  property?: string;
  queryPattern?: string;
  displayType?: 'flex' | 'grid' | 'block' | 'inline-block';
  functionName?: string;
  componentName?: string;
  hookName?: string;
  stateName?: string;
  routeName?: string;
  httpMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  modelName?: string;
  endpointPath?: string;
  className?: string;
  identifier?: string;
  callee?: string;
  eventType?: string;
  moduleName?: string;
  constructType?: 'def' | 'class' | 'try' | 'if' | 'for' | 'while' | 'return' | 'with' | 'import' | 'raise' | 'except';
  disallowedPatterns?: string[];
  patterns?: string[];
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  [key: string]: any;
}

export interface EvaluationCriterionPrivateConfig {
  targetFile?: 'html' | 'css' | 'js' | 'py';
  rule?: EvaluationRuleType;
  parameters?: EvaluationRuleParameters;

  // Legacy/backward-compatibility fields
  requiredTags?: string[];
  requiredAttributes?: Record<string, string | string[]>;
  requiredSelectors?: string[];
  requiredCssProperties?: { selector: string; property: string; valuePattern?: string }[];
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
  astConstructs?: string[];
  minOccurrences?: number;
  caseSensitive?: boolean;
}

export interface EvaluationCriterion {
  id: string;
  title: string;
  type: CriterionType;
  weight: number;
  publicFeedback: string;
  privateConfig: EvaluationCriterionPrivateConfig;
}

export interface ProjectEvaluationDefinition {
  projectId: string;
  version: number;
  criteria: EvaluationCriterion[];
  passingScore: number;
  status: 'draft' | 'published';
  updatedAt: string;
  updatedBy?: string;
}

export interface ProjectEvaluationVersionSnapshot extends ProjectEvaluationDefinition {
  publishedAt: string;
  publishedBy: string;
}

export interface ProjectSubmissionFiles {
  html?: string;
  css?: string;
  js?: string;
  py?: string;
}

export interface PublicCriterionResult {
  id: string;
  criterionId: string;
  title: string;
  passed: boolean;
  feedback: string;
  weight: number;
}

export type ProjectCriterionResult = PublicCriterionResult;

export interface InternalCriterionResult {
  id: string;
  title: string;
  passed: boolean;
  feedback: string;
  weight: number;
  diagnosticReason?: string;
  matcherResult?: boolean;
  evaluatorMetadata?: Record<string, any>;
}

export interface EvaluatorAdapter {
  readonly family: EvaluatorFamily;
  evaluate(
    criterion: EvaluationCriterion,
    files: ProjectSubmissionFiles
  ): InternalCriterionResult;
}

export interface PublicProjectEvaluationResult {
  submissionId: string;
  projectId: string;
  score: number; // 0 - 100
  passed: boolean;
  criteriaResults: PublicCriterionResult[];
  feedback: string;
  evaluatedAt: string;
  progress?: import('./projectProgress').PublicProjectProgressDTO;
}

export type ProjectEvaluationResult = PublicProjectEvaluationResult;

export interface ProjectSubmission {
  id: string;
  projectId: string;
  userId: string;
  files: ProjectSubmissionFiles;
  submittedAt: string;
  evaluatorVersion: number;
  status: 'pending' | 'evaluated' | 'failed';
  evaluationResult?: ProjectEvaluationResult;
}

export interface EvaluationValidationResult {
  valid: boolean;
  errors: string[];
}
