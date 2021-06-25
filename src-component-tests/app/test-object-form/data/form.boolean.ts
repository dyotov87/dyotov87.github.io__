export const booleanElements = [
  {
    readonly: false,
    name: 'boolean:default',
    label: 'default',
    description: 'default checkbox',
    type: 'boolean',
    required: false
  },
  {
    readonly: false,
    name: 'boolean:required',
    label: 'required checkbox',
    description: 'mandatory checkbox',
    type: 'boolean',
    required: true
  },
  {
    readonly: true,
    name: 'boolean:readonly',
    label: 'readonly checkbox',
    description: 'readonly without value',
    type: 'boolean',
    required: false
  },
  {
    readonly: true,
    name: 'boolean:readonlyvalue',
    label: 'readonly checkbox with value',
    description: 'readonly with value',
    type: 'boolean',
    required: false
  },
  {
    readonly: false,
    name: 'boolean:tristate',
    label: 'tristate checkbox',
    tristate: true,
    description: '',
    type: 'boolean',
    required: false
  },
  {
    readonly: false,
    name: 'boolean:requiredtristate',
    label: 'required tristate checkbox',
    tristate: true,
    description: 'mandatory checkbox',
    type: 'boolean',
    required: true
  }
];
