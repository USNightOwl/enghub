import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Stack,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  fullname: yup.string().required("Vui lòng điền họ và tên"),
  email: yup.string().required("Vui lòng điền email").email("Email không hợp lệ"),
  password: yup.string().required("Vui lòng điền password").min(8, "Mật khẩu ít nhất 8 kí tự"),
  confirmPassword: yup.string().required("Vui lòng điền trường này").min(8, "Mật khẩu ít nhất 8 kí tự"),
});

const RegisterPage = () => {
  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <Box marginTop={2}>
      <Stack spacing="3">
        <Card w={{ base: "full", md: "lg" }} marginX={"auto"}>
          <CardBody>
            <Center marginBottom={6}>
              <Heading>REGISTER</Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                {/* Email */}
                <FormControl isInvalid={!!errors?.email?.message}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter email" onChange={(e) => setValue("email", e.target.value)} />
                  {errors?.email?.message && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                </FormControl>
                {/* Full name */}
                <FormControl isInvalid={!!errors?.fullname?.message}>
                  <FormLabel>FullName</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Full name"
                    onChange={(e) => setValue("fullname", e.target.value)}
                  />
                  {errors?.fullname?.message && <FormErrorMessage>{errors.fullname.message}</FormErrorMessage>}
                </FormControl>
                {/* password */}
                <FormControl isInvalid={!!errors?.password?.message}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      onChange={(e) => setValue("password", e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                        {show ? <Eye /> : <EyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors?.password?.message && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                </FormControl>
                {/* confirm password */}
                <FormControl isInvalid={!!errors?.confirmPassword?.message}>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter confirm password"
                      onChange={(e) => setValue("confirmPassword", e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <Eye /> : <EyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors?.confirmPassword?.message && (
                    <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
                  )}
                </FormControl>
                <Button type="submit" isLoading={isLoading} colorScheme="blue" variant="solid">
                  REGISTER
                </Button>
              </Stack>
            </form>
            <Center marginTop={4}>
              <HStack fontSize="md" spacing="1">
                <Text>Already have an account?</Text>
                <Link to="/login" className="text-[#0969da]">
                  Login
                </Link>
              </HStack>
            </Center>
          </CardBody>
        </Card>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
