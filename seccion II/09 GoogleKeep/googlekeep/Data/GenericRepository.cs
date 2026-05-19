using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using googlekeep.Entity;
using googlekeep.Business.Contracts;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace googlekeep.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : IEntity
    {
        private ISessionFactory SessionCore { get; set; }
        public ISession Session { get; set; }
        private ITransaction transaction { get; set; }
        public GenericRepository()
        {
            LoadSession();
        }
        public void LoadSession()
        {
            var configuration = Fluently.Configure()
                .Database(PostgreSQLConfiguration.Standard
                    .ConnectionString(cs => cs
                        .Host("127.0.0.1")
                        .Port(8000)
                        .Database("googlekeep-db")
                        .Username("sa")
                        .Password("1844")
                    )
                    .DefaultSchema("public")
                    .ShowSql()
                    .Dialect<NHibernate.Dialect.PostgreSQL83Dialect>()
                    )
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<IEntity>())
                .ExposeConfiguration(cfg =>
                {
                    // Automatically create/update schema
                    new SchemaUpdate(cfg).Execute(false, true);
                })
                .BuildConfiguration();

            SessionCore = configuration.BuildSessionFactory();
            Session = SessionCore.OpenSession();
            transaction = Session.BeginTransaction();
        }

        public T GetById(int Id)
        {
            using (ISession nhSession = SessionCore.OpenSession())
            {
                nhSession.Get<T>(Id);
                return nhSession.Get<T>(Id);
            }
        }

        public T Save(T entity)
        {
            using (ISession nhSession = SessionCore.OpenSession())
            {
                using (ITransaction transaction = nhSession.BeginTransaction())
                {
                    nhSession.Save(entity);
                    transaction.Commit();
                    return entity;
                }
            }
        }

        public T Update(T t)
        {
            using (ISession nhSession = SessionCore.OpenSession())
            {
                using (ITransaction transaction = nhSession.BeginTransaction())
                {
                    nhSession.Update(t);
                    transaction.Commit();
                    return t;
                }
            }
        }

        public void Delete(T t)
        {
            using (ISession nhSession = SessionCore.OpenSession())
            {
                using (ITransaction transaction = nhSession.BeginTransaction())
                {
                    nhSession.Delete(t);
                    transaction.Commit();
                }
            }
        }
    }
}
