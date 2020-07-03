import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormLabel, Button, FormText } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const UserDetailsFormComponent = ({
    handleOnChange,
    handleFormSubmit,
    inputFields
}) => {

    const { register, errors, handleSubmit } = useForm();
    const onSubmit = data => {
        handleFormSubmit();
    }

    const renderInputFields = () => {
        const inputs = inputFields.map((field, idx) => {
            const { id, name, type, placeholder, label, isRequired, validator } = field;
            if (field.name === "emailAddress") {
                return  <FormGroup key={id}>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <FormControl 
                        id={id} 
                        type={type} 
                        name={name} 
                        placeholder={placeholder} 
                        ref={register({ required: {
                            value: isRequired,
                            message: validator?.error,
                        },
                        pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/g,
                     })}
                     onChange={handleOnChange}
                    />
                   {errors?.emailAddress  && <FormText className="error">{validator?.error}</FormText> }
                </FormGroup>
            }
            if (field.name === "password") {
                return  <FormGroup key={id}>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <FormControl 
                        id={id} 
                        type={type} 
                        name={name} 
                        placeholder={placeholder} 
                        ref={register({ required: {
                            value: isRequired,
                            message: validator?.error,
                        },
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}/,
                     })}
                     onChange={handleOnChange}
                    />
                    {errors?.password  && <FormText className="error">{validator?.error}</FormText>}
                </FormGroup>
            }   
            
            return  <FormGroup key={id}>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <FormControl 
                        id={id} 
                        type={type} 
                        name={name} 
                        placeholder={placeholder} 
                        ref={register({ required: {
                            value: isRequired,
                            message: validator?.error,
                        },
                     })}
                      onChange={handleOnChange}
                    />
                    {errors?.name  && <FormText className="error">{validator?.error}</FormText>}
                </FormGroup>
        });
        
       return inputs;
    };

   
    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
             {renderInputFields()}
            <FormGroup><Button type="submit">Submit</Button></FormGroup>
         </form>
        </>
    )
};

UserDetailsFormComponent.defaultProps = {
    inputFields: [],
    handleOnChange: () => {},
    handleFormSubmit: () => {},
}

UserDetailsFormComponent.propTypes = {
    inputFields: PropTypes.array.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
}

export default UserDetailsFormComponent;