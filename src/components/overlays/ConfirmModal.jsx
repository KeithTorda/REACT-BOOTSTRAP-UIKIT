import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../buttons/Button';

/** Confirmation dialog built on <Modal />. */
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  icon = 'exclamation-triangle',
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={null}
      footer={
        <>
          <Button variant="light" onClick={onClose}>{cancelLabel}</Button>
          <Button variant={variant} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
        </>
      }
    >
      <div className="text-center py-2">
        <div
          className="d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `var(--${variant}-soft, var(--surface-muted))`, color: `var(--${variant})`, fontSize: 28,
          }}
        >
          <i className={`bi bi-${icon}`} aria-hidden="true" />
        </div>
        <h5 className="mb-2">{title}</h5>
        <p className="text-secondary-soft small mb-0">{message}</p>
      </div>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.node,
  message: PropTypes.node,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
};
