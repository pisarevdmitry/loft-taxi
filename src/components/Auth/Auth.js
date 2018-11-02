import React, { PureComponent } from 'react';
import styles from './Auth.module.scss';
import cx from 'classnames';
import Form from '../Form';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import {
  getAuthState,
  getAuthError,
  getAuthProccessing,
  registrationRequest,
  authRequest,
  clearAuthError
} from '../../modules/Auth';
import { profileRequest, getProfileLoading } from '../../modules/Profile';
import PropTypes from 'prop-types';

const fields = [
  {
    name: 'email',
    label: 'Почта',
    type: 'text'
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password'
  }
];

class Auth extends PureComponent {
  static propTypes = {
    auth: PropTypes.bool.isRequired,
    proccessing: PropTypes.bool.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    registrationRequest: PropTypes.func.isRequired,
    authRequest: PropTypes.func.isRequired,
    profileRequest: PropTypes.func.isRequired,
    clearAuthError: PropTypes.func.isRequired
  };

  state = {
    stage: 'Authorize'
  };

  componentDidMount() {
    const { profileRequest } = this.props;

    this.shouldRedirect();
    profileRequest();
  }
  componentDidUpdate() {
    this.shouldRedirect();
  }

  shouldRedirect() {
    const { auth, history } = this.props;
    
    if (auth) {
      history.push('/profile');
    }
  }
  changeStage = e => {
    const { stage } = this.state;
    const { stage: newStage } = e.target.dataset;
    const { clearAuthError } = this.props;

    if (stage !== newStage) {
      clearAuthError();
      this.setState({
        stage: newStage
      });
    }
  };

  isAuthorize = () => {
    const { stage } = this.state;

    return stage === 'Authorize';
  };

  checkField(fieldName, value) {
    if (value.length === 0) {
      return 'поле не может быть пустым';
    }

    if (fieldName === 'email') {
      if (!isEmail(value)) {
        return 'некоректный email';
      }
    }
    return null;
  }

  validate = fields => {
    const errors = {};

    Object.entries(fields).forEach(([name, value]) => {
      const error = this.checkField(name, value);

      if (error) {
        errors[name] = error;
      }
    });
    return errors;
  };

  handleSubmit = data => {
    const { registrationRequest, authRequest } = this.props;

    if (this.isAuthorize()) {
      authRequest(data);
      return;
    }
    registrationRequest(data);
  };

  render() {
    const { proccessing, authError, profileLoading } = this.props;
    if (profileLoading) {
      return null;
    }

    return (
      <div className={styles.container}>
        <h5 className={styles.header}>
          <span
            className={cx(
              styles.header__title,
              this.isAuthorize() && styles.header__title_active
            )}
            onClick={this.changeStage}
            data-stage="Authorize"
          >
            Авторизация
          </span>
          <span
            className={cx(
              styles.header__title,
              !this.isAuthorize() && styles.header__title_active
            )}
            onClick={this.changeStage}
            data-stage="Registrate"
          >
            Регистрация
          </span>
        </h5>
        <Form
          fields={fields}
          buttonName={this.isAuthorize() ? 'Войти' : 'Зарегистрироваться'}
          validate={this.validate}
          handleSubmit={this.handleSubmit}
          disabled={proccessing}
        />
        {authError && <span className={styles.auth_Error}>{authError}</span>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuthState(state),
  proccessing: getAuthProccessing(state),
  authError: getAuthError(state),
  profileLoading: getProfileLoading(state)
});

export default connect(
  mapStateToProps,
  { registrationRequest, authRequest, profileRequest, clearAuthError }
)(Auth);
