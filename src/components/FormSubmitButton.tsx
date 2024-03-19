"use client";
import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`btn-primary btn ${className}`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};
export default FormSubmitButton;

/*
children: React.ReactNode; 

children specifies the content that will be displayed within the button. It can be a string (text), another React component, or an array of both. 

This is an object type literal that defines a property children of type React.ReactNode. React.ReactNode is a type provided by React that represents a renderable node, such as an element, string, or fragment.

In React, the type of what gets rendered inside a component (i.e., the content between the opening and closing tags of a component) is React.ReactNode.

ComponentProps<"button">: This is a utility type provided by React that gives you the props interface for a specific HTML element. In this case, "button" specifies that we want the props for the <button> element. It includes all the standard props that a <button> element can accept, such as onClick, disabled, type, etc. We destructure all these additional props in the parameter as ...

&: The ampersand & symbol is the intersection type operator in TypeScript. It is used to combine two or more types into a new type that includes all the properties and methods from the combined types.

The same type could be defined using an interface like this:

interface FormSubmitButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
}

Intersection types using the & operator in type aliases and extending interfaces using the extends keyword serve essentially the same purpose: combining multiple types into a single new type.

In the page.tsx we will render this FormSubmitButton passes an optional className property and the children are nothing but a string "Add Product". The type="submit" property is coming from ComponentProps<"button">

This is a client component because we're can only use the useFormStatus hook in client components.

At the time of building this project, the useFormStatus was an experimental feature, that's why it is experimental_useFormStatus no just useFormStatus. But we can use an alias (with as keyword) "useFormStatus", which is the same name as the hook. Now we don't have to use the long name experimental_useFormStatus. We can simply refer to this as "useFormStatus".

 We are calling the useFormStatus hook. We destructure the object returned and access the pending property, this refers to the pending state of the form. pending will be true, until the async operation is completed. As long as the operation is pending we want to disable the button, so that user can't perform any further actions until the ongoing action is finished. So, we setup a disabled prop (also coming from ComponentProps<"button">), and set it equal to pending. While the async operation is underway, pending will be true, which means disabled will also be true. When the operation is completed, pending will be set to false, which will also set the disabled to false.

 So, why we need to know whether the pending state of the form is true or false?

 While the pending state is true, we can add a loading indicator inside the button, so that the user will know something is going on in the background. This indicator will go away once the operation is performed and the pending state becomes false. This will offer a good user experience.
*/
