import { Flex, Heading, Stack, Toast, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { InputControl, SubmitButton, TextareaControl } from 'formik-chakra-ui'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addPost, getSinglePost, updatePost } from '../../queryFunctions/queryFunctions'

const AddPost = ({ isUpdate = false, id }) => {
    const cache = useQueryClient();
    const toast = useToast();
    const { isLoading, mutateAsync } = useMutation([isUpdate ? "updatePost" : "addPost"], isUpdate ? updatePost : addPost, {
        onSuccess: () => {
            isUpdate ? cache.invalidateQueries(["post", id]) : cache.invalidateQueries(["posts"])
        },
        onError: (error) => toast({ status: "error", title: error.message })
    })

    return (
        <Flex direction="column" justifyContent="flex-start" borderRadius={10} border="1px solid gray" mt="3" p="3">
            <Heading textAlign="center">{isUpdate ? "Update" : "Add"} Post</Heading>
            <Formik
                initialValues={{ title: "", body: "" }}
                onSubmit={(values, { resetForm }) => {
                    console.log(resetForm);
                    isUpdate ?
                        mutateAsync({ title: values.title, body: values.body, id })
                        : mutateAsync({ title: values.title, body: values.body })

                    resetForm({ title: "", body: "" })
                }}>
                <Form>
                    <Stack>
                        <InputControl name="title" label="Title" placeholder="Write Title" />
                        <TextareaControl name="body" label="Body" placeholder="Write Descripton" />
                        <SubmitButton isLoading={isLoading}>{isUpdate ? "UPDATE" : "ADD"} POST</SubmitButton>
                    </Stack>
                </Form>
            </Formik>
        </Flex>
    )
}

export default AddPost