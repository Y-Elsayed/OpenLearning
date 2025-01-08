import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from '../components/NavBar';

function CreatePostPage({ onLogout }) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const initialValues = {
    title: '',
    description: '',
    field: '',
    tags: [''],
    steps: [
      {
        title: '',
        description: '',
        resources: [
          {
            title: '',
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
    description: Yup.string(),
    field: Yup.string().required('Field is required'),
    tags: Yup.array().of(Yup.string()),
    steps: Yup.array().of(
      Yup.object({
        title: Yup.string().required('Step title is required'),
        description: Yup.string(),
        resources: Yup.array().of(
          Yup.object({
            title: Yup.string().required('Resource title is required'),
            type: Yup.string().required('Resource type is required'),
            link: Yup.string().url('Invalid URL').required('Resource link is required'),
          })
        ),
      }),
    ),
  });
  // Form submit function
  const  onSubmit = async (values) => {
    for (let i = 0; i < values.steps.length; i++) {
      values.steps[i].stepNumber = i + 1;
    }
    try {
      const response = await fetch("/api/posts", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Post creation error:', error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
          Post created successfully!
        </div>
      )}
      {showError && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50">
          Post creation error! Please try again.
        </div>
      )}
      <NavBar onLogout={onLogout}/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Post</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title:</label>
          <Field type="text" name="title" className="mt-1 p-2 w-full border rounded" />
          <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <Field as="textarea" rows="4" cols="50" type="text" name="description" className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="field" className="block text-gray-700">Field:</label>
          <Field type="text" name="field" className="mt-1 p-2 w-full border rounded" />
          <ErrorMessage name="field" component="p" className="text-red-500 text-sm mt-1" />
        </div>
        <FieldArray name="tags">
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { tags } = values;
                  return (
                    <div className="mb-4">
                      <label className="block text-gray-700">Tags:</label>
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <Field type="text" name={`tags[${index}]`} className="mt-1 p-2 w-full border rounded" />
                          <ErrorMessage name={`tags[${index}]`} component="p" className="text-red-500 text-sm mt-1 ml-2" />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Add Tag
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
     
              <div>
                <h2 className="text-xl font-bold mb-4">Steps:</h2>
                <FieldArray name="steps">
                  {fieldArrayProps => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { steps } = values;
                    return (
                      <div>
                        {steps.map((step, index) => (
                          <div key={index} className="mb-6 p-4 border rounded">
                            <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
                            <div className="mb-4">
                              <label className="block text-gray-700">Step Title:</label>
                              <Field type="text" name={`steps[${index}].title`} className="mt-1 p-2 w-full border rounded" />
                              <ErrorMessage name={`steps[${index}].title`} component="p" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700">Step Description:</label>
                              <Field as="textarea" rows="2" cols="50" name={`steps[${index}].description`} className="mt-1 p-2 w-full border rounded" />
                            </div>
                            <h4 className="text-md font-semibold mb-2">Resources:</h4>
                            <FieldArray name={`steps[${index}].resources`}>
                              {fieldArrayProps => {
                                const { push, remove } = fieldArrayProps;
                                const { resources } = step;
                                return (
                                  <div>
                                    {resources.map((resource, resourceIndex) => (
                                      <div key={resourceIndex} className="mb-4 p-4 border rounded">
                                        <h4 className="block font-semibold text-gray-700">Resource {resourceIndex + 1}</h4>
                                        <div className="mb-2">
                                          <label className="block text-gray-700">Resource Title:</label>
                                          <Field type="text" name={`steps[${index}].resources[${resourceIndex}].title`} className="mt-1 p-2 w-full border rounded" />
                                          <ErrorMessage name={`steps[${index}].resources[${resourceIndex}].title`} component="p" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="mb-2">
                                          <label className="block text-gray-700">Resource Type:</label>
                                          <Field as="select" name={`steps[${index}].resources[${resourceIndex}].type`} className="mt-1 p-2 w-full border rounded">
                                            <option value="">Select Type</option>
                                            <option value="video">Video</option>
                                            <option value="article">Article</option>
                                            <option value="book">Book</option>
                                            <option value="paper">Paper</option>
                                            <option value="other">Other</option>
                                          </Field>
                                          <ErrorMessage name={`steps[${index}].resources[${resourceIndex}].type`} component="p" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="mb-2">
                                          <label className="block text-gray-700">Resource Link:</label>
                                          <Field type="text" name={`steps[${index}].resources[${resourceIndex}].link`} className="mt-1 p-2 w-full border rounded" />
                                          <ErrorMessage name={`steps[${index}].resources[${resourceIndex}].link`} component="p" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        {resourceIndex > 0 && (
                                          <button
                                            type="button"
                                            onClick={() => remove(resourceIndex)}
                                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                          >
                                            Remove Resource
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      onClick={() => push({ title: '', type: '', link: '' })}
                                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                      Add Resource
                                    </button>
                                  </div>
                                );
                              }}
                            </FieldArray>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              >
                                Remove Step
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ title: '', description: '', resources: [{ title: '', type: '', link: '' }] })}
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Add Step
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

          <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Create Post</button>
        </Form>
      </Formik>
      </div>
    </div>
    </>
  );
}

export default CreatePostPage;