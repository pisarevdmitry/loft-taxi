import React, { PureComponent } from 'react';
import styles from './Profile.module.scss';
import { connect } from 'react-redux';
import { getProfile } from '../../modules/Profile';
import PropTypes from 'prop-types';

class Profile extends PureComponent {
  static propTypes = {
    profile: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  };

  render() {
    const { profile } = this.props;

    return (
      profile && (
        <div className={styles.profile}>
          <h3 className={styles.profile__title}>Профиль</h3>
          <p className={styles.profile__data}>ID: {profile.id}</p>
          <p className={styles.profile__data}>Email: {profile.email}</p>
        </div>
      )
    );
  }
}
const mapStateToProps = state => ({
  profile: getProfile(state)
});
export default connect(mapStateToProps)(Profile);

export { Profile };
