import { Course } from '../types';
import { PYTHON_LEVEL_0 } from './pythonCurriculum';
import { PYTHON_LEVEL_1 } from './pythonCurriculumLevel1';
import { PYTHON_LEVEL_2, PYTHON_LEVEL_3 } from './pythonCurriculumLevel2';
import { PYTHON_LEVEL_4, PYTHON_LEVEL_5 } from './pythonCurriculumAdvanced';
import { PYTHON_LEVEL_6, PYTHON_LEVEL_7 } from './pythonCurriculumCapstone';

export const PYTHON_COURSE: Course = {
  id: 'python-mastery',
  title: 'Python 0 → Mahir & Professional',
  shortDescription: 'Kurikulum Python komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.',
  description: 'Python Academy dirancang khusus dari nol hingga level profesional. Meliputi struktur folder proyek standar industri, OOP, decorators, clean architecture, terminal sandbox terisolasi, dan evaluasi teknis terpadu.',
  icon: 'terminal',
  levels: [
    PYTHON_LEVEL_0,
    PYTHON_LEVEL_1,
    PYTHON_LEVEL_2,
    PYTHON_LEVEL_3,
    PYTHON_LEVEL_4,
    PYTHON_LEVEL_5,
    PYTHON_LEVEL_6,
    PYTHON_LEVEL_7
  ]
};
