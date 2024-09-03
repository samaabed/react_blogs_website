import styles from "./AddBlogPage.module.css";
import BlogServices from "../../services/blog-services";
import BlogUtils from "../../utils/blog-utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormWithValidation from "../../components/common/FormWithValidation/FormWithVaildation";

// const formValidationSchema = Yup.object().shape({
//   title: Yup.string()
//     .required("Title is required")
//     .min(4, "Title is too short - should be 4 characters minimum")
//     .max(100, "Title is too long - should be 100 characters maximum"),

//   description: Yup.string()
//     .required("Description is required")
//     .min(100, "Description is too short - should be 100 characters minimum")
//     .max(1000, "Description is too long - should be 1000 characters maximum"),
// });

// const initialValues = {
//   title: "",
//   description: "",
// };


const AddBlog = () => {
  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: formValidationSchema,
  //   onSubmit: (values, { resetForm }) => {
  //     BlogServices.addBlog(values.title, values.description)
  //       .then(() => {
  //         Swal.fire({
  //           title: "Added!",
  //           text: "The blog has been added.",
  //           icon: "success",
  //         });
  //         resetForm(); //reset form 
  //       })
  //       .catch((e) => {
  //         BlogUtils.errorAlert(e.message);
  //       });
     
  //   },
  // });

  // return (
  //   <div className={styles.formWrapper}>
  //     <h2 className={styles.formHeader}>add new blog</h2>
  //     <form onSubmit={formik.handleSubmit} className={styles.addBlogForm}>
  //       <div className={styles.formRow}>
  //         <label htmlFor={styles.blogTitle} className={styles.inputHeader} >
  //           BlogTitle
  //         </label>

  //         {/*
  //          note:
  //          you can use <input id="title" {...formik.getFieldProps('title')} />
  //          which provides the props onChange, onBlur, and value for the field
  //          */}
  //         <input
  //           type="text"
  //           name="title"
  //           value={formik.values.title} //holds the current values of the fields
  //           onChange={formik.handleChange} //handles the onchange event of the field - updates the formik state with the current fileds values.
  //           onBlur={formik.handleBlur} //handles the onBlur event - marks the field as touched.
  //           id={styles.blogTitle}
  //           className={formik.touched.title  && formik.errors.title  ?
  //            styles.inputError : null}
  //         />
  //         {(formik.touched.title && formik.errors.title) && <div className={styles.inputErrorMessage}>{formik.errors.title}</div>}

  //       </div>


  //       <div className={styles.formRow}>
  //         <label
  //           htmlFor={styles.blogDescription}
  //           className={styles.inputHeader}
  //         >
  //           Blog Description
  //         </label>
  //         <textarea
  //           name="description"
  //           value={formik.values.description}
  //           onChange={formik.handleChange}
  //           id={styles.blogDescription}
  //           className={(formik.touched.description && formik.errors.description ) ?
  //               styles.inputError : null}
  //           onBlur={formik.handleBlur}
  //         ></textarea>

  //         { (formik.touched.description && formik.errors.description) && <div className={styles.inputErrorMessage}>{formik.errors.description}</div>}

  //       </div>
      

  //       <button type="submit" disabled={formik.isSubmitting} className={ formik.dirty && formik.isValid ?  styles.addBlogBtn : styles.disabledAddBtn} >
  //           {formik.isSubmitting ? "Adding the blog..." : "Add blog"}
  //       </button>

  //     </form>
  //   </div>
  // );

  return <FormWithValidation formType={"add blog"} />
};
export default AddBlog;
