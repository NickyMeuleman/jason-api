// import cuid from "cuid";
import { IFaunaContext } from "../db";
import { IJason } from "../types";

const resolvers = {
  Query: {
    hello: (root, args, context: IFaunaContext): string => `Hello, world!`,
    allJasons: (root, args, context: IFaunaContext): Promise<IJason[]> => {
      const { client, q } = context;
      return (
        client
          // get list of Refs
          .query(q.Paginate(q.Match(q.Index(`allJasons`)), { size: 1000 }))
          .then((res: any) => {
            // get list of Expr for each Ref
            const allQuery = res.data.map(ref => q.Get(ref));
            // get result of querying each Expr
            return client.query(allQuery).then((results: any) =>
              // {
              //   ref: Ref(Collection("Jason"), "_id from fauna"),
              //   ts: _ts int from fauna,
              //   data: {name: "name", twitter: "@handle"}
              // }
              results.map(item => ({ ...item.data }))
            );
          }) as any
      );
    },
    jason: (root, args, context: IFaunaContext): Promise<IJason> => {
      const { client, q } = context;
      return client
        .query(q.Get(q.Match(q.Index(`jasonById`), args.id)))
        .then((res: any) => res.data) as any;
    },
    jasonByTwitter: (root, args, context: IFaunaContext): Promise<IJason> => {
      const { client, q } = context;
      return client
        .query(q.Get(q.Match(q.Index(`jasonByTwitter`), args.twitter)))
        .then((res: any) => res.data) as any;
    }
  },
  Mutation: {
    // createJason: (root, args, context: IFaunaContext) => {
    //   const { client, q } = context;
    //   return client
    //     .query(
    //       q.Create(q.Collection("Jason"), {
    //         data: {
    //           id: cuid(),
    //           name: args.name,
    //           twitter: args.twitter,
    //           likes: 0
    //         }
    //       })
    //     )
    //     .then((res: any) => res.data);
    // },
    // createJasons: async (root, args, context: IFaunaContext) => {
    //   const { client, q } = context;
    //   let jasonsResult: any[] = [];
    //   // tried with q.map(q.Lambda()) without success, jason being an object causes trouble
    //   for (const jason of args.jasons) {
    //     await client
    //       .query(
    //         q.Create(q.Collection("Jason"), {
    //           data: { id: cuid(), likes: 0, ...jason }
    //         })
    //       )
    //       .then((res: any) => {
    //         jasonsResult.push(res.data);
    //       });
    //   }
    //   return jasonsResult;
    // },
    // updateJason: (root, args, context: IFaunaContext) => {
    //   const { client, q } = context;
    //   return client
    //     .query(
    //       q.Update(
    //         q.Select(["ref"], q.Get(q.Match(q.Index("jasonById"), args.id))),
    //         { data: args.updates }
    //       )
    //     )
    //     .then((res: any) => res.data);
    // },
    upvoteJason: async (
      root,
      args,
      context: IFaunaContext
    ): Promise<IJason> => {
      const { client, q } = context;
      const jason: any = await client.query(
        q.Get(q.Match(q.Index(`jasonById`), args.id))
      );
      return client
        .query(
          q.Update(jason.ref, {
            data: { likes: jason.data.likes + 1 }
          })
        )
        .then((res: any) => res.data);
    }
  },
  Jason: {
    firstName: (root, args, context: IFaunaContext): string =>
      // Hardcoded y'all
      `Jason`
  }
};

export { resolvers };
