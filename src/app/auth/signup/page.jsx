"use client";
import React, { useState } from 'react';
import {Check, Envelope, Eye, EyeSlash} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onSubmit = async(e) => {
    
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log('Form submitted with:', userData);
    

    const {data, error} = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      callbackURL: '/'
  })
  console.log('ddddddddddddddd', {data, error});
  if (error) {
    toast('Error signing up:' + error.message)
  }if (data) {
    toast('sign up successful! Please check your email verify your account')
  }
  };


  return (
    <div className='grid justify-center mt-10'>
      <h2 className='text-2xl font-semibold text-center mb-4'>Please SignUp Page</h2>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* username */}
                  <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input name='name' placeholder="Enter your name" />
            <FieldError />
          </TextField>
        {/* email */}
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <InputGroup>
        <InputGroup.Prefix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
      </InputGroup>
      <Description>Well never share this with anyone else</Description>
        <FieldError />
      </TextField>
      <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <InputGroup>
              <InputGroup.Input placeholder='Enter your password'
                className="w-full max-w-[330px]"
                type={isVisible ? "text" : "password"}
                //value={isVisible ? "87$2h.3diua" : "••••••••"}
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
              <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
              <FieldError />
            </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default SignUpPage;