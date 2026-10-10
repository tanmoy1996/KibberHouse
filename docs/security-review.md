# Security and corporate filtering

Local security changes include updated dependencies, browser security headers,
bounded JSON enquiry bodies, field validation and an allowlist of booking fields.
Server-controlled booking actions and credentials cannot be overridden by input.
Deploy the updated project before these changes affect the public site.

These improvements do not establish a vendor reputation rating or guarantee
access through a corporate web filter. Ask the blocking company's IT team for
the vendor, category and reason, then request the appropriate review.

Review both `https://kibberhouse.com` and `https://www.kibberhouse.com`.

Suggested review text:

> Kibber House is a family-run homestay in Kibber Village, Spiti Valley, India.
> The website provides accommodation information, room details and booking
> enquiries. Please review kibberhouse.com and www.kibberhouse.com and classify
> them under Travel/Accommodation or the closest accurate category. Please
> explain any security findings that require remediation.

Official review instructions:

- Zscaler: https://help.zscaler.com/zia/looking-up-urls-site-review
- Palo Alto Networks: https://docs.paloaltonetworks.com/advanced-url-filtering/administration/monitoring/request-to-change-the-category-for-a-url
- FortiGuard: https://www.fortiguard.com/faq/wfratingsubmit
- Cisco Talos: https://support.talosintelligence.com/docs/submit-ticket/

No vendor review has been submitted or rating verified in this change.
The production dependency audit passed after updating. The full audit still
reports a development-only ESLint dependency chain involving braces/fast-glob;
its suggested forced fix downgrades eslint-config-next across major versions,
so it was not applied. Reassess when a compatible upstream fix is available.
