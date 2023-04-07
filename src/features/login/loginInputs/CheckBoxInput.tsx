import React from 'react'

import { ErrorMessage, Field } from 'formik'

import styles from '../Login.module.css'

export const CheckBoxInput = () => {
  return (
    <div className={styles.checkBoxContainer}>
      <Field id="rememberMe" name="rememberMe" type="checkbox" className={styles.loginCheckbox} />
      <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
        Remember me
      </label>
      <ErrorMessage name="rememberMe" />
    </div>
  )
}
