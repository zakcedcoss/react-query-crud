import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Link } from "react-router-dom"
import { deletePost, getPosts } from "../../queryFunctions/queryFunctions"
import AddPost from "./AddPost"

const Home = () => {
    const cache = useQueryClient()
    const [page, setPage] = useState(1);
    const [perPageCount, setPerPageCount] = useState(10)
    const toast = useToast();
    const { data: posts, isLoading, isError, error } = useQuery(["posts", page], () => getPosts(page, perPageCount));

    const { isLoading: isMutated, mutateAsync } = useMutation(["deletePost"], deletePost, {
        onSuccess: () => {
            cache.invalidateQueries("posts")
        },
        onError: (error) => {
            toast({ status: "error", title: error.message, duration: 3000 })
        }
    })

    if (isError) {
        toast({ status: "error", title: error.message, duration: 3000 })
    }

    return (
        <Container maxW="1280px" mt="4" mb="4">
            <>
                {posts?.length > perPageCount && <Flex justifyContent="space-between" alignItems="center">
                    <Button colorScheme="red" disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Prev</Button>
                    <Text>Page - {page}</Text>
                    <Button colorScheme="green" onClick={() => setPage(prev => prev + 1)}>Next</Button>
                </Flex>}
                {isLoading ?
                    <Grid height="100vh" placeItems="center">
                        <Spinner size="xl" />
                    </Grid>
                    :
                    <>
                        {!isError && posts.length !== 0 ? posts.map(post => (
                            <Stack key={post.id} p="4" mt="3" mb="3" borderRadius={10} border="1px solid gray">
                                <Button disabled={isMutated}
                                    onClick={async () => {
                                        await mutateAsync({ id: post.id })
                                    }}>Delete</Button>
                                <Link to={`/post/${post.id}`}>
                                    <Flex justifyContent="space-between">
                                        <Text>User ID: {post.user_id}</Text>
                                        <Text>Post ID: {post.id}</Text>
                                    </Flex>
                                    <Heading>{post.title}</Heading>
                                    <Text>{post.body}</Text>
                                </Link>
                            </Stack>
                        ))
                            :
                            <Flex direction="column" justifyContent="center" alignItems="center">
                                <Heading>No Posts Found !!!</Heading>
                                <Text as="h2">Try Adding some posts</Text>
                            </Flex>
                        }
                    </>
                }
                <AddPost />
            </>
        </Container >
    )
}

export default Home