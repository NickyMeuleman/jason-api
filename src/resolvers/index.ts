import { IFaunaContext } from "../db";
import cuid from "cuid";

const resolvers = {
  Query: {
    hello: (root, args, context: IFaunaContext) => {
      return "Hello, world!";
    },
    allJasons: (root, args, context: IFaunaContext) => {
      const { client, q } = context;
      return (
        client
          // get list of Refs
          .query(q.Paginate(q.Match(q.Index("allJasons")), { size: 1000 }))
          .then((res: any) => {
            // get list of Expr for each Ref
            const allQuery = res.data.map(ref => q.Get(ref));
            // get result of querying each Expr
            return client.query(allQuery).then((res: any) => {
              // {
              //   ref: Ref(Collection("Jason"), "_id from fauna"),
              //   ts: _ts int from fauna,
              //   data: {name: "name", twitter: "@handle"}
              // }
              return res.map(item => ({ ...item.data }));
            });
          })
      );
    },
    jason: (root, args, context: IFaunaContext) => {
      const { client, q } = context;
      return client
        .query(q.Get(q.Match(q.Index("jasonById"), args.id)))
        .then((res: any) => res.data);
    },
    jasonByTwitter: (root, args, context: IFaunaContext) => {
      const { client, q } = context;
      return client
        .query(q.Get(q.Match(q.Index("jasonByTwitter"), args.twitter)))
        .then((res: any) => res.data);
    }
  },
  Mutation: {
    createJason: (root, args, context: IFaunaContext) => {
      const { client, q } = context;
      return client
        .query(
          q.Create(q.Collection("Jason"), {
            data: {
              id: cuid(),
              name: args.name,
              twitter: args.twitter
            }
          })
        )
        .then((res: any) => res.data);
    }
  },
  Jason: {
    firstName: (root, args, context: IFaunaContext) => {
      // Hardcoded y'all
      return "Jason";
    }
  }
};

export { resolvers };
