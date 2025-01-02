import { useNavigate } from 'react-router-dom';
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreatePostPage() {

  const initialValues = {
    title: '',
    desc: '',
    field: '',
    tags: [''],
    // created_at: new Date(),
    // creator_id: user.id,
    steps: [
      {
        step_title: '',
        step_desc: '',
        resources: [
          {
            res_title: '',
            type: '',
            link: '',
          },
        ],
      },
    ]
  };
  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    desc: Yup.string().required('Description is required'),
    field: Yup.string().required('Field is required'),
    tags: Yup.array().of(Yup.string()),
    steps: Yup.array().of(
      Yup.object({
        step_title: Yup.string().required('Step title is required'),
        step_desc: Yup.string().required('Step description is required'),
        resources: Yup.array().of(
          Yup.object({
            res_title: Yup.string().required('Resource title is required'),
            type: Yup.string().required('Resource type is required'),
            link: Yup.string().url('Invalid URL').required('Resource link is required'),
          })
        ),
      }),
    ),
  });
  // Form submit function
  const  onSubmit = async (values) => {
    console.log(values);
    // add creator_id to values
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <h1>Create Post</h1>
        <div>
          <label>Title:</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="p" className="error" />
        </div>
        <div>
          <label>Description:</label>
          <Field type="text" name="desc" />
          <ErrorMessage name="desc" component="p" className="error" />
        </div>
        <div>
          <label>Field:</label>
          <Field type="text" name="field" />
          <ErrorMessage name="field" component="p" className="error" />
        </div>
        <FieldArray name="tags">
          { fieldArrayProps => { 
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            const { tags } = values;
            return (
              <div>
                <label>Tags:</label>
                {tags.map((tag, index) => (
                  <div key={index}>
                    <Field type="text" name={`tags[${index}]`} />
                    <ErrorMessage name={`tags[${index}]`} component="p" className="error" />
                    {index > 0 && <button type="button" onClick={() => remove(index)}>Remove Tag</button>}
                  </div>
                ))}
                <button type="button" onClick={() => push('')}>Add Tag</button>
              </div>
            );
          }}
        </FieldArray>
        <div>
          <h2>Steps:</h2> 
          <FieldArray name="steps">
            { fieldArrayProps => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { steps } = values;
              return (
                <div>
                  {/* Steps */}
                  {steps.map((step, index) => (
                    <div key={index}>
                      <h3>Step {index + 1}</h3>
                      <div>
                        <label>Step Title:</label>
                        <Field type="text" name={`steps[${index}].step_title`} />
                        <ErrorMessage name={`steps[${index}].step_title`} component="p" className="error" />
                      </div>
                      <div>
                        <label>Step Description:</label>
                        <Field type="text" name={`steps[${index}].step_desc`} />
                        <ErrorMessage name={`steps[${index}].step_desc`} component="p" className="error" />
                      </div>
                      {/* Resources */}
                      <h4>Resources:</h4>
                      <FieldArray name={`steps[${index}].resources`}>
                        { fieldArrayProps => {
                          const { push, remove } = fieldArrayProps;
                          const { resources } = step;
                          return (
                            <div>
                              {resources.map((resource, resourceIndex) => (
                                <div key={resourceIndex}>
                                  <label>Resource {resourceIndex + 1}</label>
                                  <div>
                                    <label>Resource Title:</label>
                                    <Field type="text" name={`steps[${index}].resources[${resourceIndex}].res_title`} />
                                    <ErrorMessage name={`steps[${index}].resources[${resourceIndex}].res_title`} component="p" className="error" />
                                  </div>
                                  <div>
                                    <label>Resource Type:</label>
                                    <Field as="select" name={`steps[${index}].resources[${resourceIndex}].type`}>
                                      <option value="">Select Type</option>
                                      <option value="video">Video</option>
                                      <option value="article">Article</option>
                                      <option value="book">Book</option>
                                      <option value="paper">Paper</option>
                                      <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name={`steps[${index}].resources[${resourceIndex}].type`} component="p" className="error" />
                                  </div>
                                  <div>
                                    <label>Resource Link:</label>
                                    <Field type="text" name={`steps[${index}].resources[${resourceIndex}].link`} />
                                    <ErrorMessage name={`steps[${index}].resources[${resourceIndex}].link`} component="p" className="error" />
                                  </div>
                                  {resourceIndex > 0 && <button type="button" onClick={() => remove(resourceIndex)}>Remove Resource</button>}
                                </div>
                              ))}
                              <button type="button" onClick={() => push({ res_title: '', type: '', link: '' })}>Add Resource</button>
                            </div>
                          );
                        }}
                      </FieldArray>

                      {index > 0 && <button type="button" onClick={() => remove(index)}>Remove Step</button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ step_title: '', step_desc: '', resources: [{res_title:'', type: '', link: ''}] })}>Add Step</button>
                </div>
              );
            }}
          </FieldArray>
        </div>

        <button type="submit">Create Post</button>
      </Form>
    </Formik>
  );
}

export default CreatePostPage;