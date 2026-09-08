import PropTypes from 'prop-types';
import TextInput from './TextInput';

/** Native date/time picker. <DateInput label="Start date" mode="date" value={v} onChange={fn} /> */
export default function DateInput({ mode = 'date', ...rest }) {
  const type = { date: 'date', time: 'time', datetime: 'datetime-local', month: 'month', week: 'week' }[mode] || 'date';
  return <TextInput type={type} {...rest} />;
}

DateInput.propTypes = {
  mode: PropTypes.oneOf(['date', 'time', 'datetime', 'month', 'week']),
};
