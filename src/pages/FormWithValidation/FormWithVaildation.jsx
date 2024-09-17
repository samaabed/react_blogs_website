import styles from "./FormWithVaildation.module.css";
import BlogUtils from "../../utils/blog-utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import BlogServices from "../../services/blog-services";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";


const enLanguageRegex = /^[\x00-\x7F]+$/;
/*
arabic letters \u0600-\u06FF
whitespace \s
english digits 0-9
all punctuation characters \p{P}
all symbol characters (eg. dollar symbols) \p{S}
*/
const arLanguageRegex = /^[\u0600-\u06FF\s0-9\p{P}\p{S}]+$/u;


const enFormValidationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(enLanguageRegex, "You must use English letters only")
    .required("Title is required")
    .min(4, "Title is too short - should be 4 characters minimum")
    .max(100, "Title is too long - should be 100 characters maximum"),

  description: Yup.string()
    .matches(enLanguageRegex, "You must use English letters only")
    .required("Description is required")
    .min(100, "Description is too short - should be 100 characters minimum")
    .max(1000, "Description is too long - should be 1000 characters maximum"),
});

const arFormValidationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(arLanguageRegex, "يجب استخدام الحروف العربية فقط")
    .required("العنوان مطلوب")
    .min(4, "العنوان قصير جدا - يحب أن يحتوي على أربع أحرف كحد أقل")
    .max(100, "العنوان طويل جدا - يمكن أن يحتوي على 100 حرف كحد أقصى"),

  description: Yup.string()
    .matches(arLanguageRegex, "يجب استخدام الحروف العربية فقط")
    .required("الوصف مطلوب")
    .min(100, "الوصف قصير جدا - يحب أن يحتوي على أربع أحرف كحد أقل")
    .max(1000, "الوصف طويل جدا - يمكن أن يحتوي على 100 حرف كحد أقصى"),
});


const initialValues = {
  title: "",
  description: "",
};

const FormWithValidation = ({formType}) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');

  const { id: blogId } = useParams();
  
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: i18n.language == "en" ? enFormValidationSchema : arFormValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (formType == "addBlog") {
      
        BlogServices.addBlog(values.title, values.description, i18n.language)
          .then(() => {
            BlogUtils.successAlert(t("addBlogDoneMessageTitle"), t("addBlogDoneMessageText"));
            resetForm(); //reset form
          })
          .catch((e) => {
            BlogUtils.errorAlert(t("oops"), t("addBlogErrorMessageText"));
          });
      } else if (formType == "updateBlog") {
        BlogServices.updateBlog(blogId, values.title, values.description, i18n.language)
          .then(() => {
            BlogUtils.successAlert(t("updateBlogDoneMessageTitle"), t("updateBlogDoneMessageText"));
            resetForm(); //reset form
          })
          .catch((e) => {
            BlogUtils.errorAlert(t("oops"), t("updateBlogErrorMessageText"));
          });
      }
    },
  });

  //TODO: display the blog to be updated
  // useEffect(() => {
  //   if (blogId) {
  //     BlogServices.fetchBlogById(blogId, i18n.language).then((blog) => {
  //       setBlogTitle(blog.title);
  //       setBlogDescription(blog.description);
  //     });
  //   }
  // }, []);

  return (
    
    <div className={styles.formWrapper}>
      <h2 className={styles.formHeader}>
        {formType == "addBlog" ? t("addNewBlog") : t("updateBlog")}
      </h2>
      <p>{console.log(i18n.language)}</p>
      <form onSubmit={formik.handleSubmit} className={styles.addBlogForm}>
        <div className={styles.formRow}>
          <label htmlFor={styles.blogTitle} className={styles.inputHeader}>
            {t("blogTitle")}
          </label>

          {/*
           note: new 
           you can use <input id="title" {...formik.getFieldProps('title')} />
           which provides the props onChange, onBlur, and value for the field
           */}
          <input
            type="text"
            name="title"
            value={formik.values.title} //holds the current values of the fields
            onChange={formik.handleChange} //handles the onchange event of the field - updates the formik state with the current fileds values.
            onBlur={formik.handleBlur} //handles the onBlur event - marks the field as touched.
            id={styles.blogTitle}
            className={
              formik.touched.title && formik.errors.title
                ? styles.inputError
                : null
            }
          />
          {formik.touched.title && formik.errors.title && (
            <div className={styles.inputErrorMessage}>
              {formik.errors.title}
            </div>
          )}
        </div>

        <div className={styles.formRow}>
          <label
            htmlFor={styles.blogDescription}
            className={styles.inputHeader}
          >
            {t("blogDescription")}

          </label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            id={styles.blogDescription}
            className={
              formik.touched.description && formik.errors.description
                ? styles.inputError
                : null
            }
            onBlur={formik.handleBlur}
          ></textarea>

          {formik.touched.description && formik.errors.description && (
            <div className={styles.inputErrorMessage}>
              {formik.errors.description}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={
            formik.dirty && formik.isValid
              ? styles.addBlogBtn
              : styles.disabledAddBtn
          }
        >
          {formType == "addBlog" ? t("add") : t("update")}
        </button>
      </form>
    </div>
  );
};
export default FormWithValidation;
