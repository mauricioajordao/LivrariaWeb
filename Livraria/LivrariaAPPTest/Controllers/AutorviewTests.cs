using LivrariaWebAppApi.Controllers;
using NUnit.Framework;
using Rhino.Mocks;

namespace LivrariaAPPTest.Controllers
{
    [TestFixture]
    public class AutorviewTests
    {


        [SetUp]
        public void SetUp()
        {

        }

        private Autorview CreateAutorview()
        {
            return new Autorview();
        }

        [Test]
        public void TestMethod1()
        {
            // Arrange
            var autorview = this.CreateAutorview();

            // Act


            // Assert
            Assert.Fail();
        }
    }
}
