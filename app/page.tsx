// File: app/page.tsx
import { neon } from '@neondatabase/serverless';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(process.env.DATABASE_URL ?? '');
    const name = (formData.get('name') as string).trim();
    const description = (formData.get('description') as string).trim();
    // Insert the comment from the form into the Postgres database
    await sql`INSERT INTO features (name, description) VALUES (${name}, ${description});`;
  }

  return (
    <form action={create} className='flex flex-col gap-6 max-w-sm'>
      <h2>Add Vehicle Features to Master Features Table</h2>
      <input type="text" placeholder="Feature Name" name="name"/>
      <input type="text" placeholder="Description" name="description" />
      <button type="submit">Submit</button>
    </form>
  );
}