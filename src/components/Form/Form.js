import React, { PureComponent } from 'react';
import styles from './Form.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class Form extends PureComponent {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
    ),
    buttonName: PropTypes.string.isRequired,
    validate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  constructor(props) {
    super();
    const { fields } = props;
    const stateFields = {};
    const errors = {};

    fields.forEach(field => {
      const { name } = field;

      stateFields[name] = '';
      errors[name] = '';
    });
    this.state = {
      fields: stateFields,
      errors: errors
    };
  }

  _onSubmitHandler = e => {
    const { validate, handleSubmit } = this.props;
    const { fields } = this.state;

    const errors = validate(fields);
    if (Object.entries(errors).length > 0) {
      this.setState({
        errors: errors
      });
      return;
    }
    handleSubmit(fields);

    this.setState({
      fields: this.resetFields(fields)
    });
  };

  resetFields(fields) {
    const resetedFields = {};

    Object.keys(fields).forEach(field => {
      resetedFields[field] = '';
    });
    return resetedFields;
  }
  onChangeHandler = e => {
    const { fields } = this.state;

    this.setState({
      fields: {
        ...fields,
        [e.target.name]: e.target.value
      }
    });
  };

  renderFields = () => {
    const { fields, disabled } = this.props;
    const { fields: stateFields, errors } = this.state;

    return fields.map(field => {
      const { name, label, type } = field;

      return (
        <TextField
          key={name}
          fullWidth
          margin="dense"
          label={label}
          placeholder={label}
          name={name}
          value={stateFields[name]}
          onChange={this.onChangeHandler}
          type={type}
          error={!!errors[name]}
          helperText={errors[name]}
          disabled={disabled}
        />
      );
    });
  };

  render() {
    const { buttonName, disabled } = this.props;

    return (
      <form>
        {this.renderFields()}
        <div className={styles.form_btn}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={this._onSubmitHandler}
            disabled={disabled}
          >
            {buttonName}
          </Button>
        </div>
      </form>
    );
  }
}

export default Form;
