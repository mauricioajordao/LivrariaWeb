using LivrariaWebAppApi.Controllers;
using NUnit.Framework;
using Rhino.Mocks;

namespace LivrariaAPPTest.Controllers
{
    [TestFixture]
    public class assuntoviewTests
    {


        [SetUp]
        public void SetUp()
        {

        }

        private assuntoview Createassuntoview()
        {
            return new assuntoview();
        }

        [Test]
        public void TestMethod1()
        {
            // Arrange
            var assuntoview = this.Createassuntoview();

            // Act


            // Assert
            Assert.Fail();
        }
    }
}
