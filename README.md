# JaSON API

Too many Jasons?

## Update 9 Match 2020

On <time dateTime="2020-03-09">9 March</time> I disabled the
serverless functions from running in production.

The site's loading and waving mechanisms have been adjusted to
be **visually identical** to when the serverless functions
were online. As a result, waves are no longer sent to the database and
will not be counted.

To view the code of this site when serverless functions were enabled,
check out [the repository at the last state with serverless functions enabled](https://github.com/NickyMeuleman/jason-api/tree/dfb0a7f2469fef55aa4f616b9e181d09bf40007b)

Only a few lines of code are different. The different lines were
commented out and replaced immediately below.

To view the code that moved away from serverless functions, check
out [the pull request that removes serverless functions](https://github.com/NickyMeuleman/jason-api/pull/6)

## Pre 9 March

### Is the `firstName` field just a hardcoded `"Jason"` string?

Yes, yes it is.

### Notes

Some mutation are commented out in the schema (as are their respective resolvers).
They are fully functional, but disabled because the GraphQL playground is open and I don't want the internet to have free reign over the database 🤷‍♂
