"use client";

import Image from "next/image";
import { SessionInterface } from "@/common.types";
import { ChangeEvent, useState } from "react";
import { categoryFilters } from "@/app/constants";

import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
    type: string;
    session: SessionInterface;
}

const ProjectForm = ({type, session}: Props) => {
    
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: '',
    });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
        if( type === 'create') {
            //create project
        }

    } catch (error) {
        
    }
  };

  const handleChangeImage = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if(!file) return;

    if(!file.type.includes('image')) {
        alert('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        const result = reader.result as string;

        handleStateChange('image', result);
    }
  };

  const handleStateChange = (fieldname: string, value: string) => {
    setForm((prev) => ({...prev, [fieldname]: value}));
  };



  return (
    <form
     onSubmit={handleFormSubmit}
     className="flexStart form"
    >
        <div className="flexStart form_image-container">
            <label htmlFor="poster" className="flexCenter form_image-label">
                {!form.image && 'Choose a poster for your project'}
            </label>
            <input 
             id="image"
             type="file" 
             accept="image/*"
             required={type === 'create' ? true : false}
             className="form_image-input"
             onChange={handleChangeImage}
            />
            {form.image && (
                <Image 
                 src={form?.image}
                 className="sm:p-10 object-contain z-20"
                 alt="Project poster"
                 fill
                />
            )}
        </div>

        <FormField
          title="Title"
          state={form.title}
          placeholder="Talentify"
          setState={(value) => handleStateChange('title', value)}
        />

        <FormField
          title="Description"
          state={form.description}
          placeholder="Showcase and discover remarkable work from the best creative talent around the world."
          setState={(value) => handleStateChange('description', value)}
        />

        <FormField
          type="url"
          title="Website URL"
          state={form.liveSiteUrl}
          placeholder="https://google.com"
          setState={(value) => handleStateChange('liveSiteUrl', value)}
        />

        <FormField
          type="url"
          title="GitHub URL"
          state={form.githubUrl}
          placeholder="https://github.com/johndoe"
          setState={(value) => handleStateChange('githubUrl', value)}
        />

        <CustomMenu
         title="Category"
         state={form.category}
         filters={categoryFilters}
         setState={(value) => handleStateChange('category', value)}
        />

        <div className="flexStart w-full">
            <Button
             title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
             type="submit"
             leftIcon={submitting ? '' : '/plus.svg'}
             submitting={submitting}
            />
        </div>
    </form>
  )
}

export default ProjectForm;