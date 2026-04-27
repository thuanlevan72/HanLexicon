using System;
using System.Threading.Tasks;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HanLexicon.Tests
{
    public class CheckLogsSchema
    {
        public static async Task Run()
        {
            var connectionString = "Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password";
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            optionsBuilder.UseNpgsql(connectionString);

            using (var context = new HanLexiconDbContext(optionsBuilder.Options))
            {
                Console.WriteLine("=== ACTUAL DATABASE SCHEMA FOR 'logs' TABLE ===");
                try {
                    var conn = context.Database.GetDbConnection();
                    if (conn.State != ConnectionState.Open) await conn.OpenAsync();
                    
                    using (var cmd = conn.CreateCommand()) {
                        cmd.CommandText = "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'logs' ORDER BY column_name";
                        using (var reader = await cmd.ExecuteReaderAsync()) {
                            bool found = false;
                            while (await reader.ReadAsync()) {
                                found = true;
                                Console.WriteLine($"- COLUMN: [{reader["column_name"]}] TYPE: {reader["data_type"]}");
                            }
                            if (!found) Console.WriteLine("Table 'logs' NOT FOUND!");
                        }
                    }
                }
                catch (Exception ex) {
                    Console.WriteLine("Error querying schema: " + ex.Message);
                }
            }
        }
    }
}
