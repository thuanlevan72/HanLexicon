using HanLexicon.Domain.Entities;
using Xunit;

namespace HanLexicon.Tests
{
    public class UserTests
    {
        [Fact]
        public void User_Initialization_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var username = "testuser";

            // Act
            var user = new User
            {
                Id = userId,
                Username = username,
                IsActive = true
            };

            // Assert
            Assert.Equal(userId, user.Id);
            Assert.Equal(username, user.Username);
            Assert.True(user.IsActive);
        }
    }
}
