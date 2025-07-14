import { headers } from "next/headers"
import { userAgent } from "next/server"

export type DeviceInfo = Awaited<ReturnType<typeof getDeviceInfo>>

/**
 * Gets detailed device information from the current request
 * @description Extracts comprehensive device, browser, and operating system information from the request headers
 * @returns {Promise<DeviceInfo>} Object containing:
 * - device: Device information including type and model
 * - browser: Browser name and version
 * - os: Operating system details
 * - engine: Browser engine information
 * - isBot: Whether the request is from a bot
 * - isMobile: True if device is mobile
 * - isTablet: True if device is tablet
 * - isDesktop: True if device is desktop
 * @example
 * const deviceInfo = await getDeviceInfo();
 * console.log(`Browser: ${deviceInfo.browser.name} ${deviceInfo.browser.version}`);
 */
export async function getDeviceInfo() {
  const headersList = await headers()

  const requestInfo = {
    headers: headersList,
  }

  const { device, browser, os, engine, isBot } = userAgent(requestInfo)

  return {
    device,
    browser,
    os,
    engine,
    isBot,
    isMobile: device.type === 'mobile',
    isTablet: device.type === 'tablet',
    isDesktop: !['mobile', 'tablet'].includes(device.type || ''),
  }
}