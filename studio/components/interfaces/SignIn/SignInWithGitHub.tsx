import { auth, getReturnToPath } from 'lib/gotrue'
import { useRouter } from 'next/router'
import { Button, IconGitHub } from 'ui'

const SignInWithGitHub = () => {
  const { basePath } = useRouter()
  async function handleGithubSignIn() {
    try {
      const { error } = await auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${
            process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
              ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL + (basePath && `${basePath}`)
              : process.env.NEXT_PUBLIC_SITE_URL
          }${getReturnToPath()}`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      block
      onClick={handleGithubSignIn}
      icon={<IconGitHub width={18} height={18} />}
      size="large"
      type="default"
    >
      Continue with GitHub
    </Button>
  )
}

export default SignInWithGitHub
