export const truncateEmail = (email: string, maxLength: number): string => {
    if (email.length <= maxLength) {
      return email;
    }
  
    const separatorIndex = email.indexOf("@");
    const username = email.substring(0, separatorIndex);
    const domain = email.substring(separatorIndex);
  
    const truncatedDomain =
      domain.length > maxLength - username.length
        ? `@${domain.substring(domain.length - (maxLength - username.length - 3), domain.length)}...`
        : domain;
    return `${username}${truncatedDomain}`;
  };