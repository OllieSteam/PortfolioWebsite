/**
 * SteamWidgets - Steam Widgets for your website
 * 
 * Module: Steam Workshop Widget
 * 
 * Visit: https://github.com/danielbrendel
 */

const STEAMWIDGETS_WORKSHOP_ENDPOINT = 'https://www.steamwidgets.com';
const STEAMWIDGETS_WORKSHOP_VERSION = 'v1';
 
/**
* Class SteamWorkshopElem
* 
* Handle custom HTML element to render Steam workshop widgets
*/
class SteamWorkshopElem extends HTMLElement
{
    DESCRIPTION_MAX_LEN = 40;

    storedData = {};
    oldHeader = '';
 
    connectedCallback()
    {
        var itemid = (typeof this.attributes.itemid !== 'undefined') ? this.attributes.itemid.value : null;
        var views = (typeof this.attributes.views !== 'undefined') ? this.attributes.views.value : 'Views';
        var subscriptions = (typeof this.attributes.subscriptions !== 'undefined') ? this.attributes.subscriptions.value : 'Subscriptions';
        var favorites = (typeof this.attributes.favorites !== 'undefined') ? this.attributes.favorites.value : 'Favorites';
        var author = (typeof this.attributes.author !== 'undefined') ? this.attributes.author.value : 'By :creator';
        var viewtext = (typeof this.attributes.viewtext !== 'undefined') ? this.attributes.viewtext.value : 'View item';
        var showImage = (typeof this.attributes['show-image'] !== 'undefined') ? parseInt(this.attributes['show-image'].value) : 1;
        var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
        var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? parseInt(this.attributes['style-shadow'].value) : 1;
        var styleColorBackground = (typeof this.attributes['style-color-background'] !== 'undefined') ? this.attributes['style-color-background'].value : null;
        var styleColorTitle = (typeof this.attributes['style-color-title'] !== 'undefined') ? this.attributes['style-color-title'].value : null;
        var styleColorDescription = (typeof this.attributes['style-color-description'] !== 'undefined') ? this.attributes['style-color-description'].value : null;
        var styleColorStatsCount = (typeof this.attributes['style-color-stats-count'] !== 'undefined') ? this.attributes['style-color-stats-count'].value : null;
        var styleColorStatsLabel = (typeof this.attributes['style-color-stats-label'] !== 'undefined') ? this.attributes['style-color-stats-label'].value : null;

        if (itemid !== null) {
            this.storedData = {
                itemid: itemid,
                views: views,
                subscriptions: subscriptions,
                favorites: favorites,
                author: author,
                viewtext: viewtext,
                showImage: showImage,
                styleBorder: styleBorder,
                styleShadow: styleShadow,
                styleColorBackground: styleColorBackground,
                styleColorTitle: styleColorTitle,
                styleColorDescription: styleColorDescription,
                styleColorStatsCount: styleColorStatsCount,
                styleCOlorStatsLabel: styleColorStatsLabel
            };

            this.setupWidget(
                itemid,
                views,
                subscriptions,
                favorites,
                author,
                viewtext,
                showImage,
                styleBorder,
                styleShadow,
                styleColorBackground,
                styleColorTitle,
                styleColorDescription,
                styleColorStatsCount,
                styleColorStatsLabel
            );
        }
    }
 
    setupWidget(itemid, views, subscriptions, favorites, author, viewtext, showImage, styleBorder, styleShadow, styleColorBackground, styleColorTitle, styleColorDescription, styleColorStatsCount, styleColorStatsLabel)
    {
        var req = new XMLHttpRequest();
        var self = this;

        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(req.responseText);

                if (!document.getElementById('steamwidgets-workshop-styles')) {
                    let link = document.createElement('link');
                    link.id = 'steamwidgets-workshop-styles';
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = STEAMWIDGETS_WORKSHOP_ENDPOINT + '/api/resource/query?type=css&module=workshop&version=' + STEAMWIDGETS_WORKSHOP_VERSION;
                    document.getElementsByTagName('head')[0].appendChild(link);
                }

                let borderCodeWorkshop = '';
                let borderCodeWorkshopPreview = '';
                if (styleBorder !== null) {
                    if (styleBorder === 'max') {
                        borderCodeWorkshop = '';
                        borderCodeWorkshopPreview = '';
                    } else if (styleBorder === 'small') {
                        borderCodeWorkshop = 'border-radius: 4px;';
                        borderCodeWorkshopPreview = 'steam-workshop-preview-small';
                    } else if (styleBorder === 'none') {
                        borderCodeWorkshop = 'border-radius: unset;';
                        borderCodeWorkshopPreview = 'steam-workshop-preview-none';
                    }
                }

                let workshopBaseStyle = '';
                if (!styleShadow) {
                    workshopBaseStyle += 'box-shadow: unset;';
                }
                if (borderCodeWorkshop.length > 0) {
                    workshopBaseStyle += borderCodeWorkshop;
                }
                if (styleColorBackground !== null) {
                    workshopBaseStyle += 'background-color: ' + styleColorBackground + ';';
                }

                let description = json.data.description;
                if (description.length >= self.DESCRIPTION_MAX_LEN) {
                description = description.substr(0, self.DESCRIPTION_MAX_LEN - 3) + '...';
                }

                author = author.replace(':creator', 'Ollie');
                
                let html = `
                <div class="steam-workshop" style="height: 209px;"` + ((workshopBaseStyle.length > 0) ? 'style="' + workshopBaseStyle + '"' : '') + `>
                    <div class="steam-workshop-preview ` + ((borderCodeWorkshopPreview.length > 0) ? borderCodeWorkshopPreview : '') + `" style="background-image: url('` + json.data.preview_url + `'); ` + ((!showImage) ? 'display: none;' : '') + `"></div>
                
                    <div class="steam-workshop-info" style="width: 45%;"` + ((!showImage) ? 'style="top: 13px; width: 150%;"' : '') + `>
                        <div class="steam-workshop-info-title" ` + ((styleColorTitle !== null) ? 'style="color: ' + styleColorTitle + ';"' : '') + `>` + json.data.title + `</div>
                
                        <div class="steam-workshop-info-description" ` + ((styleColorDescription !== null) ? 'style="color: ' + styleColorDescription + ';"' : '') +  `>` + description + `</div>
                
                        <div class="steam-workshop-info-stats" style="margin-bottom: 8px;">
                            <div class="steam-workshop-info-stats-item">
                                <div class="steam-workshop-info-stats-item-count" ` + ((styleColorStatsCount !== null) ? 'style="color: ' + styleColorStatsCount + ';"' : '') +  `>` + self.readableCount(json.data.views) + `</div>
                                <div class="steam-workshop-info-stats-item-label" ` + ((styleColorStatsLabel !== null) ? 'style="color: ' + styleColorStatsLabel + ';"' : '') +  `>` + views + `</div>
                            </div>
                
                            <div class="steam-workshop-info-stats-item">
                                <div class="steam-workshop-info-stats-item-count" ` + ((styleColorStatsCount !== null) ? 'style="color: ' + styleColorStatsCount + ';"' : '') +  `>` + self.readableCount(json.data.subscriptions) + `</div>
                                <div class="steam-workshop-info-stats-item-label" ` + ((styleColorStatsLabel !== null) ? 'style="color: ' + styleColorStatsLabel + ';"' : '') +  `>`+ subscriptions + `</div>
                            </div>
                
                            <div class="steam-workshop-info-stats-item">
                                <div class="steam-workshop-info-stats-item-count" ` + ((styleColorStatsCount !== null) ? 'style="color: ' + styleColorStatsCount + ';"' : '') +  `>` + self.readableCount(json.data.favorited) + `</div>
                                <div class="steam-workshop-info-stats-item-label" ` + ((styleColorStatsLabel !== null) ? 'style="color: ' + styleColorStatsLabel + ';"' : '') +  `>`+ favorites + `</div>
                            </div>
                        </div>
                
                        <div class="steam-workshop-info-footer">
                            <div class="steam-workshop-info-footer-author" style="margin-bottom: 10px;"><a href="` + 'https://steamcommunity.com/id/TopLadOllie/' + `">` + author + `</a></div>
                
                            <div class="steam-workshop-info-footer-action">
                                <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=` + json.data.publishedfileid + `">` + viewtext + `</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                self.innerHTML = html;
            }
        };
        req.open('GET', STEAMWIDGETS_WORKSHOP_ENDPOINT + '/api/query/workshop?itemid=' + itemid, true);
        req.send();
    }
 
    updateWidget()
    {
        this.setupWidget(
            this.storedData.itemid,
            this.storedData.views,
            this.storedData.subscriptions,
            this.storedData.favorites,
            this.storedData.author,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorStatsCount,
            this.storedData.styleColorStatsLabel
        );
    }

    changeLang(views, subscriptions, favorites, author, viewtext)
    {
        this.storedData.views = views;
        this.storedData.subscriptions = subscriptions;
        this.storedData.favorites = favorites;
        this.storedData.author = author;
        this.storedData.viewtext = viewtext;

        this.setupWidget(
            this.storedData.itemid,
            this.storedData.views,
            this.storedData.subscriptions,
            this.storedData.favorites,
            this.storedData.author,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorStatsCount,
            this.storedData.styleColorStatsLabel
        );
    }

    setImageVisibility(visibility)
    {
        this.storedData.showImage = visibility;
        
        this.setupWidget(
            this.storedData.itemid,
            this.storedData.views,
            this.storedData.subscriptions,
            this.storedData.favorites,
            this.storedData.author,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorStatsCount,
            this.storedData.styleColorStatsLabel
        );
    }

    readableCount(count)
    {
        const COUNT_MILLION = 1000000;
        const COUNT_HUNDREDTHOUSAND = 100000;
        const COUNT_TENTHOUSAND = 10000;
        const COUNT_THOUSAND = 1000;

        if (count >= COUNT_MILLION) {
            return (Math.round(count / COUNT_MILLION, 1)).toString() + 'M';
        } else if ((count < COUNT_MILLION) && (count >= COUNT_HUNDREDTHOUSAND)) {
            return (Math.round(count / COUNT_THOUSAND, 1)).toString() + 'K';
        } else if ((count < COUNT_HUNDREDTHOUSAND) && (count >= COUNT_TENTHOUSAND)) {
            return (Math.round(count / COUNT_THOUSAND, 1)).toString() + 'K';
        } else if ((count < COUNT_TENTHOUSAND) && (count >= COUNT_THOUSAND)) {
            return (Math.round(count / COUNT_THOUSAND, 1)).toString() + 'K';
        } else {
            return count.toString();
        }
    }
}
 
window.customElements.define('steam-workshop', SteamWorkshopElem);