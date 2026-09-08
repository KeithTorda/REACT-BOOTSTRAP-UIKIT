import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import { cn } from '../../utils/cn';

/**
 * Repeating rows of fields (line items, contacts, attachments…).
 *
 * <RepeaterField
 *   label="Line items"
 *   value={rows}
 *   onChange={setRows}
 *   emptyRow={{ description: '', quantity: 1 }}
 *   renderRow={(row, update) => (<>
 *     <TextInput value={row.description} onChange={e => update({ description: e.target.value })} />
 *   </>)}
 * />
 */
export default function RepeaterField({
  label, value = [], onChange, renderRow, emptyRow = {}, addLabel = 'Add row',
  min = 0, max = Infinity, helperText, className,
}) {
  const update = (index, patch) =>
    onChange?.(value.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  const add = () => value.length < max && onChange?.([...value, { ...emptyRow }]);
  const remove = (index) => value.length > min && onChange?.(value.filter((_, i) => i !== index));

  return (
    <div className={cn('mb-3', className)}>
      {label && <div className="form-label">{label}</div>}

      {value.map((row, index) => (
        <div className="d-flex gap-2 align-items-start mb-2" key={row.id ?? index}>
          <div className="flex-grow-1">{renderRow?.(row, (patch) => update(index, patch), index)}</div>
          <IconButton
            icon="trash3"
            variant="light"
            size="sm"
            label="Remove row"
            className="mt-1"
            disabled={value.length <= min}
            onClick={() => remove(index)}
          />
        </div>
      ))}

      <Button size="sm" tone="soft" variant="primary" icon="plus-lg" onClick={add} disabled={value.length >= max}>
        {addLabel}
      </Button>
      {helperText && <div className="uikit-helper">{helperText}</div>}
    </div>
  );
}

RepeaterField.propTypes = {
  label: PropTypes.node, value: PropTypes.array, onChange: PropTypes.func,
  renderRow: PropTypes.func, emptyRow: PropTypes.object, addLabel: PropTypes.string,
  min: PropTypes.number, max: PropTypes.number, helperText: PropTypes.node, className: PropTypes.string,
};
