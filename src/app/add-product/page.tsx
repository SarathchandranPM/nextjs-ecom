import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product | EmptyWallet",
};
// When you open this page, the title you see in the browser tab will be "Add Product | EmptyWallet".

const addProduct = async (formData: FormData) => {
  "use server";

  const name = formData.get("productName")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  // redirect("/");
};

const page = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Products</h1>

      <form action={addProduct}>
        <input
          required
          name="productName"
          placeholder="Product name"
          type="text"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          id="description"
          className="textarea-bordered textarea mb-3 w-full"
        ></textarea>
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
};
export default page;

/* 
When the form is submitted, the browser automatically creates a FormData object containing the name-value pairs of all the form fields.

In this case, the action prop of the form element is set to {addProduct}. This means that when the form is submitted, the addProduct function will be called with the form data as its argument.
*/

/*
To add a loading indicator to the button we need access to form status. For this we can use the useFormStatus hook. The useFormStatus hook is a custom React hook that is commonly used to manage the status or state of a form in a React application. It is not a built-in hook provided by React itself, but rather a reusable piece of logic that developers can create and use in their own projects.

The purpose of the useFormStatus hook is to encapsulate the logic related to tracking the various states of a form, such as:

1. Initial State: The initial state of the form before any user input.

2. Editing State: The state when the user is actively editing or interacting with the form fields.

3. Submitting State: The state when the form is being submitted (e.g., when the user clicks the submit button).

4. Success State: The state when the form submission was successful.

5. Error State: The state when there was an error during form submission.

We can only use this hook in a client component. So, we extract the button and set it up as a client component. 

When you click the "Add Product" button, a new product document will be created in our products collection. This is an async operation that takes some time. The form status will be pending until the operation completes. 

In the FormSubmitButton.tsx, we are calling the useFormStatus hook. We destructure the object returned and access the pending property. pending will be true, until the async operation is completed.  
*/

/*
If you open the network tab, you can see clearly what actually happens when you click the Add Product button. We are making a POST request to the URL http://localhost:3000/add-product
*/
