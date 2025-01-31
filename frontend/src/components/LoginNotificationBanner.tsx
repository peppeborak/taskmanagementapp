import Alert from '@mui/material/Alert'

type Props = {
  loginNotificationSeverity: string | null
}

export const LoginNotificationBanner = ({
  loginNotificationSeverity,
}: Props) => {
  return (
    <div>
      {loginNotificationSeverity === null && <></>}
      {loginNotificationSeverity === 'success' && (
        <Alert variant="outlined" severity="success" sx={{ marginBottom: 2 }}>
          This is an outlined success Alert.
        </Alert>
      )}
      {loginNotificationSeverity === 'error' && (
        <Alert variant="outlined" severity="error" sx={{ marginBottom: 2 }}>
          Invalid email or password
        </Alert>
      )}
    </div>
  )
}
