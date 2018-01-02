/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* Test suite for the feeds */
    describe('RSS Feeds', function() {

        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined and non-empty URLs', function () {
            for (var i=0;i < allFeeds.length;i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toEqual('');
            }    
        })


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined and non-empty names', function () {
            for (var i=0;i < allFeeds.length;i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual('');
            }    
        })
    });

    /* Test suite for the menu */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function () {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        })

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        describe('visibility toggles', function () {
            it('on when the icon is clicked once', function () {
                $('a.menu-icon-link').click();
                expect($(document.body).hasClass('menu-hidden')).toBe(false);
            });
            it('and off when the icon is clicked again', function () {
                $('a.menu-icon-link').click();
                expect($(document.body).hasClass('menu-hidden')).toBe(true);
            })
        })
    });

    /* Test suite for initial feeed entries */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        })

        it('should be non-empty', function() {
            var feedEntryCount = $('.feed .entry').length;
            expect(feedEntryCount).toBeGreaterThan(0);
        })
    });

    /* Test suite for new feed selection */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var oldFeed;
        var newFeed;

        beforeEach(function(done) {
            loadFeed(0,function() {
                oldFeed = $('.feed').html();
                done();
            });
        })

        it('produces new content', function(done) {
            loadFeed(1,function() {
                newFeed = $('.feed').html();
                expect(oldFeed).not.toBe(newFeed);
                done();
            });
        })
    });

}());
