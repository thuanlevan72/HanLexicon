namespace HanLexicon.Tests;

public class UnitTest1
{
    [Fact]
    public async Task TestCheckSchema()
    {
        await CheckLogsSchema.Run();
    }
}
