import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getSinglePost } from "../../queryFunctions/queryFunctions"
import AddPost from "../Home/AddPost"

const SinglePost = () => {
    const { id } = useParams();
    const toast = useToast();
    const { data: post, isLoading, isError, error } = useQuery(["post", parseInt(id)], () => getSinglePost(id));
    if (isError) {
        toast({ status: "error", title: error.message, duration: 3000 })
    }
    return (
        <Container maxW="1280px" mt="4">
            {isLoading ?
                <Grid height="100vh" placeItems="center">
                    <Spinner size="xl" />
                </Grid>
                :
                <>
                    {!isError &&
                        <Stack p="4">
                            <Flex justifyContent="space-between">
                                <Text>User ID: {post.user_id}</Text>
                                <Text>Post ID: {post.id}</Text>
                            </Flex>
                            <Heading>{post.title}</Heading>
                            <Text>{post.body}</Text>
                        </Stack>
                    }
                </>
            }
            <AddPost isUpdate={true} id={parseInt(id)} />
        </Container >
    )
}

export default SinglePost