# Fixing AWS Amplify 'Unable to assume specified IAM Role' Error

This error occurs when the AWS Amplify service (or CodeBuild) does not have permission to assume the IAM Role attached to your project. This is a security configuration issue in your AWS account.

## Steps to Fix

1. **Log in to the AWS Console**: Go to [https://console.aws.amazon.com/](https://console.aws.amazon.com/).

2. **Find Your Amplify App's Service Role**:
   - Go to the **AWS Amplify** service.
   - Click on your application (Frontend2).
   - Go to **App settings** -> **General** in the left sidebar.
   - Locate the **Service role** section. Note the name of the role (e.g., `AmplifyConsoleServiceRole-xxxxx` or similar).

3. **Edit the IAM Role Trust Policy**:
   - Go to the **IAM** service in the AWS Console.
   - Click **Roles** in the left sidebar.
   - Search for and click on the role name you found in step 2.
   - Click on the **Trust relationships** tab.
   - Click **Edit trust policy**.

4. **Update the Trust Policy JSON**:
   ensure the JSON looks like the following. The critical part is allowing `"Service": "amplify.amazonaws.com"`.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Service": "amplify.amazonaws.com"
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
   ```
   *(Note: If the role is also used by CodeBuild, you might see `codebuild.amazonaws.com` as well. You can include both in a list if needed, but for Amplify specifically, `amplify.amazonaws.com` is required.)*

5. **Save Changes**: Click **Update Policy**.

6. **Retry the Build**:
   - Go back to the **AWS Amplify** console for your app.
   - Go to the implementation/build page.
   - Click **Redeploy this version** or trigger a new build.

## Why This Happened

AWS resources (like Amplify) need explicit permission to access other resources in your account. The "Trust Relationship" is the rule that says "Amplify is allowed to assume this role." If this rule is missing or incorrect, the build fails immediately because it cannot get the necessary permissions to run.
