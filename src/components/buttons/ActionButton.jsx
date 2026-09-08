import PropTypes from 'prop-types';
import Button from './Button';

const PRESETS = {
  create: { icon: 'plus-lg', variant: 'primary', label: 'Add New' },
  edit: { icon: 'pencil-square', variant: 'info', label: 'Edit' },
  delete: { icon: 'trash3', variant: 'danger', label: 'Delete' },
  view: { icon: 'eye', variant: 'secondary', label: 'View' },
  save: { icon: 'check2', variant: 'success', label: 'Save' },
  cancel: { icon: 'x-lg', variant: 'light', label: 'Cancel' },
  export: { icon: 'download', variant: 'light', label: 'Export' },
  import: { icon: 'upload', variant: 'light', label: 'Import' },
  print: { icon: 'printer', variant: 'light', label: 'Print' },
  refresh: { icon: 'arrow-clockwise', variant: 'light', label: 'Refresh' },
  filter: { icon: 'funnel', variant: 'light', label: 'Filter' },
};

/**
 * Button with a preset icon/variant/label for a common admin action.
 * <ActionButton action="delete" onClick={fn} />
 */
export default function ActionButton({ action = 'create', label, children, ...rest }) {
  const preset = PRESETS[action] || PRESETS.create;
  return (
    <Button variant={preset.variant} icon={preset.icon} {...rest}>
      {children || label || preset.label}
    </Button>
  );
}

ActionButton.ACTIONS = Object.keys(PRESETS);
ActionButton.propTypes = {
  action: PropTypes.oneOf(Object.keys(PRESETS)),
  label: PropTypes.string,
  children: PropTypes.node,
};
